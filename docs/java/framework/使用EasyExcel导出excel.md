# 使用EasyExcel导出excel

## 背景

本来一直在用easypoi，但是发现多sheet导出easyexcel的支持更好一点，遂切换

## 依赖

```pom
<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>easyexcel</artifactId>
			<version>2.2.7</version>
		</dependency>
```



## 导出多sheet

```java
public void export(X param, HttpServletResponse response) {
        String templatePath = "xxx"
        OutputStream fos = null;
        ExcelWriter excelWriter;
        try {
            fos = response.getOutputStream();
            response.setContentType("application/vnd.ms-excel");
            SimpleDateFormat yyyyMMdd = new SimpleDateFormat("yyyyMMddHHmmss");
            String date = yyyyMMdd.format(new Date());
            String fileName = "xxx" + date;
            fileName = new String(fileName.getBytes(StandardCharsets.UTF_8), "ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");

            excelWriter = EasyExcel.write(fos).withTemplate(templatePath).build();
            WriteSheet sheet0 = EasyExcel.writerSheet(0, "xxx").build();
            WriteSheet sheet1 = EasyExcel.writerSheet(1, "xxx").build();

            FillConfig fillConfig = FillConfig.builder().forceNewRow(Boolean.FALSE).build();
            //遍历：模版文件 {t.属性}  
            excelWriter.fill(new FillWrapper("t", xxx), fillConfig, sheet0);//.fill(exportDate, writeSheet0); 填充单独属性
            excelWriter.fill(new FillWrapper("t", xxx), fillConfig, sheet1);
            excelWriter.finish();
        } catch (Exception e) {
            log.info("xxx");
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    log.error("xxxx");
                }
            }
        }
    }
```

