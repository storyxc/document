# POI事件模式解析并读取Excel文件数据

## 背景
传统的POI用户模式解析Excel为我们操作提供了丰富的API,用起来很方便,但是这种模式是一次性将Excel中的数据全部写入内存,并且要还封装结构,使得内存的占用远远超过原本Excel文件的大小,稍微大一点的文件采用用户模式进行解析都会内存溢出,由于现在做的项目要处理的Excel数据量普遍都很大,而且业务对导入功能的使用尤其频繁,所以必须采用事件模式的解析方式来实现业务需求.

事件模式避免内存溢出的原理很简单,就是采用SAX方式解析Excel文件底层的XML文件,这样逐行读取,逐行处理的方式可以完美解决内存占用的问题.

简单的入门程序可以从POI官网找到,下面是根据官方demo封装的一个比较完善的类,只需要创建一个类继承该抽象类然后实现抽象方法rowHandler,然后在rowHandler里进行我们需要的业务操作即可.

关于事件模式解析Excel的代码执行具体流程以后有时间再写篇文章进行总结~


## 代码
```java
/**
 * @author storyxc
 * @description POI事件模式读取Excel抽象类
 * @createdTime 2020/6/18 14:27
 */
public abstract class POIEventModeHandler extends DefaultHandler {

    /**
     * 构造方法
     *
     * @param parseCellValueStringFlag 是否将单元格值解析成字符串
     * @param ignoreFirstRow           是否忽略首行(一般是表头)
     */
    public POIEventModeHandler(final boolean parseCellValueStringFlag, final boolean ignoreFirstRow) {
        this.parseCellValueStringFlag = parseCellValueStringFlag;
        this.ignoreFirstRow = ignoreFirstRow;
    }

    /**
     * 构造方法
     *
     * @param parseCellValueStringFlag 将单元格值解析成字符串
     * @param ignoreFirstRow           忽略首行
     * @param dataFormatStyle          指定日期类型解析格式 默认yyyy-MM-dd
     */
    public POIEventModeHandler(final boolean parseCellValueStringFlag, final boolean ignoreFirstRow, final String dataFormatStyle) {
        this.parseCellValueStringFlag = parseCellValueStringFlag;
        this.ignoreFirstRow = ignoreFirstRow;
        this.dateFormatStyle = dataFormatStyle;
    }

    /**
     * 单元格类型索引
     */
    protected enum CellDataType {
        /**
         * 布尔值
         */
        BOOL("b"),
        /**
         * 异常错误
         */
        ERROR("e"),
        /**
         * 公式
         */
        FORMULA("str"),
        /**
         * 字符
         */
        INLINESTR("inlineStr"),
        /**
         * 共享字符表
         */
        SSTINDEX("s"),
        /**
         * 数值
         */
        NUMBER("n"),
        /**
         * 空
         */
        NULL("null");

        private final String cellType;

        String getCellType() {
            return this.cellType;
        }

        CellDataType(final String cellType) {
            this.cellType = cellType;
        }

        static CellDataType getCellTypeEnum(final String cellType) {
            for (final CellDataType cellDataType : CellDataType.values()) {
                //数字类型时c标签没有t属性
                if (cellType == null) {
                    return NUMBER;
                } else if (StringUtils.equals(cellDataType.getCellType(), cellType)) {
                    return cellDataType;
                }
            }
            return null;
        }
    }

    /**
     * sheet样式
     */
    @Data
    @EqualsAndHashCode(callSuper = false)
    protected class SheetStyle {
        /**
         * sheet顺序索引
         */
        private int sheetId;
        /**
         * sheet名称
         */
        private String sheetName;
        /**
         * 缩放百分比
         */
        private double zoomPercent;
        /**
         * 自适应
         */
        private boolean fitToPage = false;
        /**
         * 是否显示网格线
         */
        private boolean showGridLines = true;
        /**
         * 默认行高
         */
        private double defaultRowHeight;
        /**
         * sheet中每一列的样式
         */
        Map<String, ColumnStyle> columnStyles;
        /**
         * 合并单元格
         */
        private List<Integer[]> mergeCells;
        /* 打印属性 */
        /**
         * 上边距
         */
        private double topMargin = 0.75;
        /**
         * 下边距
         */
        private double bottomMargin = 0.75;
        /**
         * 左边距
         */
        private double leftMargin = 0.7;
        /**
         * 右边距
         */
        private double rightMargin = 0.7;
        /**
         * 页脚边距
         */
        private double footerMargin = 0.3;
        /**
         * 页头边距
         */
        private double headerMargin = 0.3;
        /**
         * 缩放比例
         */
        private short scale = 100;
        /**
         * 页宽
         */
        private short fitWidth = 1;
        /**
         * 页高
         */
        private short fitHeight = 1;
        /**
         * 纸张设置
         */
        private short pageSize = PrintSetup.A4_PAPERSIZE;
        /**
         * 垂直居中
         */
        private boolean verticallyCenter;
        /**
         * 水平居中
         */
        private boolean horizontallyCenter;
        /**
         * 横向打印
         */
        private boolean landscape;
        /**
         * 网格线
         */
        private boolean printGridlines;
        /**
         * 行号列标
         */
        private boolean printHeadings;
        /**
         * 草稿品质
         */
        private boolean draft;
        /**
         * 单色打印
         */
        private boolean noColor;
        /**
         * 打印顺序 true:先行后列 false:先列后行
         */
        private boolean leftToRigh;
        /**
         * 起始页页码自动
         */
        private boolean usePage;
        /**
         * 起始页码
         */
        private short pageStart = 1;
        /**
         * 页眉页脚与页边距对齐
         */
        private boolean alignWithMargins = true;
    }

    /**
     * 列样式
     */
    @Data
    @EqualsAndHashCode(callSuper = false)
    protected class ColumnStyle {
        /**
         * 列宽度
         */
        private double columnWidth;
        /**
         * 列是否隐藏
         */
        private boolean isHidden;
        /**
         * 默认的列样式
         */
        private int defaultColumnStyleIndex;
    }

    /**
     * 行数据
     */
    @Data
    @EqualsAndHashCode(callSuper = false)
    protected class RowData {
        /**
         * 当前行高
         */
        private double rowHeight;
        /**
         * 当前行数据
         */
        private List<Object> cellDataValues;
        /**
         * 当前行单元格样式索引
         */
        private List<Integer> cellStyles;
        /**
         * 当前行单元格数据类型
         */
        private List<CellDataType> cellDataTypes;
        /**
         * 单元格公式
         */
        private List<String> cellFormula;

        RowData() {
            this.cellDataValues = new ArrayList<>();
            this.cellStyles = new ArrayList<>();
            this.cellDataTypes = new ArrayList<>();
            this.cellFormula = new ArrayList<>();
        }
    }

    /**
     * sheet打印区域
     */
    @Data
    @EqualsAndHashCode(callSuper = false)
    protected class SheetPrint {
        private String sheetName;
        private String sheetIndex;
        private String printArea;
        private String printTitleRows;
        private String printTitleColumns;
    }

    /**
     * 共享字符表
     */
    protected SharedStringsTable sst;
    /**
     * 单元格样式
     */
    private StylesTable stylesTable;
    /**
     * sheet游标
     */
    private int sheetIndex = 0;
    /**
     * 行游标
     */
    private int rowIndex;
    /**
     * 列坐标
     */
    private int colIndex;
    /**
     * 最大行数量
     */
    protected int rowMax;
    /**
     * 最大列数量
     */
    protected int colMax;
    /**
     * 是否为有效数据
     */
    private boolean valueFlag;
    /**
     * T
     */
    private boolean isTElement = false;
    /**
     * 记录当前值
     */
    private StringBuilder cellBuilder;
    /**
     * 是否过滤首行
     */
    protected boolean ignoreFirstRow = false;
    /**
     * 格式化日期样式
     */
    protected String dateFormatStyle = "yyyy-MM-dd";
    /**
     * 格式化样式
     */
    protected Map<Short, String> formatStyleMap = new HashMap<>();
    /**
     * 数据格式化formatter
     */
    private final DataFormatter dataFormatter = new DataFormatter();
    /**
     * 当前sheet样式
     */
    private SheetStyle sheetStyle;
    /**
     * 行数据
     */
    private RowData rowData;
    /**
     * sheet打印区域 key:sheetIndex
     */
    protected final Map<String, SheetPrint> sheetPrintMap = new HashMap<>();
    /**
     * 所有sheetName,key:sheetIndex
     */
    private final Map<String, String> sheetNameMap = new HashMap<>();
    /**
     * 当前打印标签的sheetIndex
     */
    private String localSheetId;
    /**
     * 辨别是否打印区域数据
     */
    private boolean printFlag;
    /**
     * 是否解析成String
     */
    private final boolean parseCellValueStringFlag;
    /**
     * 是否读取公式
     */
    protected boolean isReadFormula = false;
    /**
     * 是否共享公式
     */
    private boolean isSharedFormula;
    /**
     * 共享公式存放
     */
    private final Map<String, String> sharedFormulaMap = new HashMap<>();
    /**
     * 共享公式插值
     */
    private final Map<String, List<Integer>> diffMap = new HashMap<>();
    /**
     * 共享公式存放key
     */
    private String si;

    /**
     * 核心抽象方法,读取一行后的操作,将业务逻辑在该方法中实现
     *
     * @param sheetIndex
     * @param rowIndex
     * @param rowData
     */
    protected abstract void rowHandler(final int sheetIndex, final int rowIndex, final RowData rowData);

    /**
     * sheet处理完后调用的方法
     *
     * @param sheetIndex
     * @param sheetStyle
     */
    protected void sheetOver(final int sheetIndex, final SheetStyle sheetStyle) {
        return;
    }

    /**
     * 整个工作簿处理完后调用
     */
    protected void workbookOver() {
        return;
    }

    /**
     * 处理完整的Excel
     *
     * @param filePath
     * @throws OpenXML4JException
     * @throws IOException
     * @throws SAXException
     */
    public void handleExcel(final String filePath) throws OpenXML4JException, IOException, SAXException {
        OPCPackage opcPackage = null;
        try {
            opcPackage = OPCPackage.open(filePath);
            final XMLReader parser = fetchSheetParser();
            final XSSFReader.SheetIterator sheets = parseSheet(opcPackage, parser);
            while (sheets.hasNext()) {
                final InputStream sheet = sheets.next();
                sheetStyle = new SheetStyle();
                sheetStyle.setSheetName(sheets.getSheetName());
                final InputSource sheetSource = new InputSource(sheet);
                parser.parse(sheetSource);
                sheet.close();
            }
        } finally {
            if (opcPackage != null) {
                opcPackage.close();
            }
        }
        workbookOver();
    }

    /**
     * 处理指定的sheet页
     * @param filePath
     * @param sheetIdx
     * @throws OpenXML4JException
     * @throws SAXException
     * @throws IOException
     */
    public void handleExcel(final String filePath, final int sheetIdx) throws OpenXML4JException, SAXException, IOException {
        OPCPackage opcPackage = null;
        try {
            opcPackage = OPCPackage.open(filePath);
            final XMLReader parser = fetchSheetParser();
            final XSSFReader.SheetIterator sheets = parseSheet(opcPackage, parser);
            while (sheets.hasNext()) {
                final InputStream sheet = sheets.next();
                if (sheetIndex + 1 != sheetIdx) {
                    continue;
                }
                sheetStyle = new SheetStyle();
                sheetStyle.setSheetName(sheets.getSheetName());
                final InputSource sheetSource = new InputSource(sheet);
                parser.parse(sheetSource);
                sheet.close();
            }
        } finally {
            if (opcPackage != null) {
                opcPackage.close();
            }
        }
        workbookOver();
    }

    private XSSFReader.SheetIterator parseSheet(OPCPackage opcPackage, XMLReader parser) throws IOException, OpenXML4JException, SAXException {
        final XSSFReader reader = new XSSFReader(opcPackage);
        sst = reader.getSharedStringsTable();
        stylesTable = reader.getStylesTable();
        final XSSFReader.SheetIterator sheets = (XSSFReader.SheetIterator) reader.getSheetsData();
        //读取工作簿内容
        final InputStream workbookData = reader.getWorkbookData();
        final InputSource workbookDataSource = new InputSource(workbookData);
        parser.parse(workbookDataSource);
        workbookData.close();
        //读取单元格样式
        final InputStream stylesData = reader.getStylesData();
        final InputSource stylesDataSource = new InputSource(stylesData);
        parser.parse(stylesDataSource);
        stylesData.close();
        return sheets;

    }

    private XMLReader fetchSheetParser() throws SAXException {
        final XMLReader parser = XMLReaderFactory.createXMLReader("org.apache.xerces.parsers.SAXParser");
        parser.setContentHandler(this);
        return parser;
    }


    /**
     * 读取每对标签的开始标签时调用的方法
     *
     * @param uri
     * @param localName
     * @param name       当前标签名
     * @param attributes 当前标签上的属性
     */
    @Override
    public void startElement(final String uri, final String localName,
                             final String name, final Attributes attributes) {
        if ("numFmt".equals(name)) {
            final short numFmtId = Short.parseShort(attributes.getValue("numFmtId"));
            final String formatCode = attributes.getValue("formatCode");
            formatStyleMap.put(numFmtId, formatCode);
        } else if ("mergeCells".equals(name)) {
            sheetStyle.setMergeCells(new ArrayList<Integer[]>());
        } else if ("mergeCell".equals(name)) {
            final String[] range = attributes.getValue("ref").split(":");
            final Integer[] positionDx = new Integer[4];
            final int[] start = parsePosition(range[0]);
            final int[] end = parsePosition(range[1]);
            positionDx[0] = start[1];
            positionDx[1] = end[1];
            positionDx[2] = start[0] - 1;
            positionDx[3] = end[0] - 1;
            sheetStyle.getMergeCells().add(positionDx);
        } else if ("pageSetUpPr".equals(name)) {
            if (attributes.getValue("fitToPage") != null && attributes.getValue("fitToPage").equals("1")) {
                sheetStyle.setFitToPage(true);
            }
        } else if ("sheetView".equals(name)) {
            if (attributes.getValue("showGridLines") != null && attributes.getValue("showGridLines").equals("0")) {
                sheetStyle.setShowGridLines(false);
            }
            if (attributes.getValue("zoomScale") != null) {
                sheetStyle.setZoomPercent((int) Double.parseDouble(attributes.getValue("zoomScale")));
            }
        } else if ("sheetFormatPr".equals(name)) {
            if (attributes.getValue("defaultRowHeight") != null) {
                sheetStyle.setDefaultRowHeight(Double.parseDouble(attributes.getValue("defaultRowHeight")));
            }
        } else if ("sheetData".equals(name)) {
            //开始读取sheet页数据
            sheetIndex++;
            rowIndex = 1;
            cellBuilder = new StringBuilder();
            rowData = new RowData();
            sheetHandler(sheetIndex, sheetStyle);
        } else if ("dimension".equals(name)) {
            handleMax(attributes.getValue("ref"));
            sheetStyle.setColumnStyles(new HashMap<String, ColumnStyle>());
        } else if ("col".equals(name)) {
            final int startColIndex = Integer.parseInt(attributes.getValue("min"));
            final int endColIndex = Integer.parseInt(attributes.getValue("max"));
            final double columnWidth = Double.parseDouble(attributes.getValue("width"));
            int defaultColumnStyleIndex = 0;
            boolean hidden = false;
            if (attributes.getValue("style") != null) {
                defaultColumnStyleIndex = Integer.parseInt(attributes.getValue("style"));
            }
            if (attributes.getValue("hidden") != null && (attributes.getValue("hidden").equals("true") || attributes.getValue("hidden").equals("1"))) {
                hidden = true;
            }
            final ColumnStyle columnStyle = new ColumnStyle();
            columnStyle.setDefaultColumnStyleIndex(defaultColumnStyleIndex);
            columnStyle.setHidden(hidden);
            columnStyle.setColumnWidth(columnWidth);
            sheetStyle.getColumnStyles().put(Integer.toString(startColIndex) + ":" + Integer.toString(endColIndex), columnStyle);
        } else if ("row".equals(name)) {
            //开始读取行数据
            rowIndex = Integer.parseInt(attributes.getValue("r"));
            adjustRowMax(rowIndex);
            //清空数据容器中保留的上一行的数据
            rowData.getCellDataValues().clear();
            rowData.getCellStyles().clear();
            rowData.getCellDataTypes().clear();
            rowData.getCellFormula().clear();
            colIndex = 1;
            if (attributes.getValue("ht") != null) {
                rowData.setRowHeight(Double.parseDouble(attributes.getValue("ht")));
            }
        } else if ("c".equals(name)) {
            //读取单元格内容
            final String position = attributes.getValue("r");
            if (position != null) {
                colIndex = parsePosition(position)[0];
                adjustColMax(colIndex);
                for (int idx = rowData.getCellStyles().size() + 1; idx < colIndex; idx++) {
                    rowData.getCellStyles().add(null);
                }
                for (int idx = rowData.getCellDataValues().size() + 1; idx < colIndex; idx++) {
                    rowData.getCellDataValues().add(null);
                }
                for (int idx = rowData.getCellDataTypes().size() + 1; idx < colIndex; idx++) {
                    rowData.getCellDataTypes().add(null);
                }
                for (int idx = rowData.getCellFormula().size() + 1; idx < colIndex; idx++) {
                    rowData.getCellFormula().add(null);
                }
            }
            if (attributes.getValue("s") != null) {
                rowData.getCellStyles().add(Integer.parseInt(attributes.getValue("s")));
            } else {
                rowData.getCellStyles().add(null);
            }
            rowData.getCellDataTypes().add(CellDataType.getCellTypeEnum(attributes.getValue("t")));
        } else if ("v".equals(name)) {
            //单元格数据
            valueFlag = true;
        } else if ("t".equals(name)) {
            isTElement = true;
            valueFlag = true;
        } else if ("definedName".equals(name) && StringUtils.isNotBlank(attributes.getValue("localSheetId"))) {
            final String value = attributes.getValue("name");
            if ("_xlnm.Print_Area".equals(value) || "_xlnm.Print_Titles".equals(value)) {
                valueFlag = true;
                printFlag = true;
                localSheetId = attributes.getValue("localSheetId");
                cellBuilder = new StringBuilder();
            }
        } else if ("sheet".equals(name)) {
            sheetNameMap.put(attributes.getValue("r:id"), attributes.getValue("name"));
        } else if ("pageMargins".equals(name)) {
            //页边距

        } else if ("pageSetup".equals(name)) {
            //页面设置

        } else if ("printOptions".equals(name)) {
            //打印选项

        } else if ("headerFooter".equals(name)) {
            //页眉页脚

        } else if (isReadFormula && "f".equals(name)) {
            //公式
            valueFlag = true;
            if ("shared".equals(attributes.getValue("t"))) {
                //共享公式
                isSharedFormula = true;
                si = attributes.getValue("si");
            }
        }
    }

    /**
     * 读取每对标签的结束标签时调用
     *
     * @param uri
     * @param localName
     * @param name
     */
    @Override
    public void endElement(final String uri, final String localName, final String name) {
        Object result;
        if ("worksheet".equals(name)) {
            //一个sheet读取完毕
            cellBuilder = null;
            rowIndex = 0;
            sheetOver(sheetIndex, sheetStyle);
        } else if ("row".equals(name)) {
            //一行数据读取完毕
            if (rowIndex == 1 && ignoreFirstRow) {
                //过滤首行数据 一般为表头
                return;
            }
            //调用实现的业务逻辑方法处理当前行数据
            rowHandler(sheetIndex, rowIndex, rowData);
            rowIndex++;
            rowData.setRowHeight(0);
        } else if ("v".equals(name)) {
            //读取到单元格的数据标签
            final CellDataType cellDataType = rowData.getCellDataTypes().get(colIndex - 1);
            switch (cellDataType) {
                case BOOL:
                    final char firstFlag = cellBuilder.toString().charAt(0);
                    if (parseCellValueStringFlag) {
                        result = firstFlag == '0' ? "false" : "true";
                    } else {
                        result = firstFlag != '0';
                    }
                    break;
                case ERROR:
                    result = "\"ERROR:" + cellBuilder.toString() + "\"";
                    break;
                case FORMULA:
                    if (parseCellValueStringFlag) {
                        result = cellBuilder.toString();
                    } else {
                        try {
                            result = Double.parseDouble(cellBuilder.toString());
                        } catch (Exception e) {
                            result = cellBuilder.toString();
                        }
                    }
                    break;
                case INLINESTR:
                    result = new XSSFRichTextString(cellBuilder.toString());
                    break;
                case SSTINDEX:
                    //共享字符需要从共享字符表中取
                    final int idx = Integer.parseInt(cellBuilder.toString());
                    result = new XSSFRichTextString(sst.getEntryAt(idx));
                    break;
                case NUMBER:
                    if (parseCellValueStringFlag) {
                        final Integer styleAt = rowData.getCellStyles().get(colIndex - 1);
                        if (styleAt != null) {
                            final XSSFCellStyle cellStyle = stylesTable.getStyleAt(styleAt);
                            final short formatIndex = cellStyle.getDataFormat();
                            final String formatString = cellStyle.getDataFormatString();
                            if (formatString == null) {
                                result = cellBuilder.toString();
                            } else if (formatString.contains("m/dd/yy")
                                    || formatString.contains("m/d/yy")
                                    || formatString.contains("yyyy/mm/dd")
                                    || formatString.contains("yyyy/m/d")) {
                                result = dataFormatter.formatRawCellContents(
                                        Double.parseDouble(cellBuilder.toString()),
                                        formatIndex, dateFormatStyle).replace("T", "");
                            } else {
                                result = dataFormatter.formatRawCellContents(Double.parseDouble(cellBuilder.toString()),
                                        formatIndex, formatString).replace("_", "").trim();
                            }
                        } else {
                            result = cellBuilder.toString();
                        }
                    } else {
                        result = Double.parseDouble(cellBuilder.toString());
                    }
                    break;
                default:
                    result = null;
            }
            writeColData(result);
            valueFlag = false;
        } else if ("c".equals(name)) {
            colIndex++;
        } else if ("f".equals(name)) {
            if (isReadFormula) {
                rowData.getCellDataTypes().set(colIndex - 1, CellDataType.FORMULA);
                writeColData(cellBuilder);
                valueFlag = false;
            }
            cellBuilder.delete(0, cellBuilder.length());
        } else if (isTElement) {
            result = cellBuilder.toString().trim();
            writeColData(result);
            isTElement = false;
            valueFlag = false;
        } else if (printFlag && "definedName".equals(name)) {
            result = cellBuilder.toString();
            writePrint(result);
            valueFlag = false;
            printFlag = false;
            cellBuilder.delete(0, cellBuilder.length());
        }
    }

    /**
     * 写sheet打印区域和打印标题
     *
     * @param result
     */
    private void writePrint(Object result) {
        final String res = result.toString();
        if (StringUtils.isBlank(localSheetId) || StringUtils.equals(res, "#REF!") || StringUtils.isBlank(res)) {
            return;
        }
        final String rId = "rId" + (Integer.parseInt(localSheetId) + 1);
        final String sheetName = sheetNameMap.get(rId);
        final SheetPrint sheetPrint = sheetPrintMap.containsKey(sheetName) ? sheetPrintMap.get(sheetName) : new SheetPrint();
        sheetPrint.setSheetName(sheetName);
        sheetPrint.setSheetIndex(localSheetId);
        for (String str : res.split(",")) {
            final int i = isArea(str.split("!")[1]);
            if (i == 1) {
                sheetPrint.setPrintArea(res);
            } else if (i == 2) {
                sheetPrint.setPrintTitleRows(str);
            } else if (i == 3) {
                sheetPrint.setPrintTitleColumns(str);
            }
        }
        sheetPrintMap.put(sheetName, sheetPrint);
        localSheetId = null;
    }

    /**
     * @param str
     * @return 1-区域 2-顶端 3-左端 0-判断错误
     */
    private int isArea(String str) {
        String split = str.split(":")[0];
        int countMatches = StringUtils.countMatches(split, "$");
        if (countMatches == 2) {
            return 1;
        } else if (countMatches == 1) {
            String substr = split.substring(split.length() - 1);
            char charAt = substr.charAt(0);
            Pattern pattern = Pattern.compile("[0-9]*");
            if (pattern.matcher(substr).matches()) {
                return 2;
            } else if ((charAt >= 'a' && charAt <= 'z') || (charAt >= 'A' && charAt <= 'Z')) {
                return 3;
            }
        }
        return 0;

    }

    /**
     * 计算当前的最大行和列数
     *
     * @param ref
     */
    private void handleMax(String ref) {
        final String[] range = ref.split(":");
        String maxStr;
        if (range.length == 1) {
            maxStr = range[0];
        } else {
            maxStr = range[1];
        }
        final int[] maxPosition = parsePosition(maxStr);
        rowMax = maxPosition[1];
        colMax = maxPosition[0];
    }

    /**
     * 把单元格数据添加到当前行的数据容器中
     *
     * @param result
     */
    private void writeColData(final Object result) {
        rowData.getCellDataValues().add(result);
        cellBuilder.delete(0, cellBuilder.length());
    }

    /**
     * 数据append到cellBuilder中
     *
     * @param ch
     * @param start
     * @param length
     */
    @Override
    public void characters(final char[] ch, final int start, final int length) {
        if (valueFlag) {
            cellBuilder.append(ch, start, length);
        }
    }

    /**
     * sheet处理
     *
     * @param sheetIndex
     * @param sheetStyle
     */
    private void sheetHandler(int sheetIndex, SheetStyle sheetStyle) {

    }

    /**
     * 获取position坐标的实际坐标数据
     *
     * @param position
     * @return
     */
    private int[] parsePosition(String position) {
        final int[] result = new int[2];
        final String amPosition = position.replaceAll("[0-9]", "");
        final char[] chars = amPosition.toUpperCase().toCharArray();
        int ret = 0;
        for (int i = 0; i < chars.length; i++) {
            ret += (chars[i] - 'A' + 1) * Math.pow(26, chars.length - i - 1);
        }
        result[0] = ret;
        result[1] = Integer.parseInt(position.replaceAll("[A-Z]", ""));
        return result;
    }

    /**
     * 调整列最大值
     *
     * @param colIndex
     */
    private void adjustColMax(final int colIndex) {
        if (colIndex > colMax) {
            colMax = colIndex;
        }
    }

    /**
     * 调整行最大值
     *
     * @param rowIndex
     */
    private void adjustRowMax(final int rowIndex) {
        if (rowIndex > rowMax) {
            rowMax = rowIndex;
        }
    }
}

```