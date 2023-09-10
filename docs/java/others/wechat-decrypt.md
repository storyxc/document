# 微信小程序加密数据对称解密工具类



## 背景

小程序授权登录获取用户手机号功能

## 依赖

```xml
<dependency>
    <groupId>org.bouncycastle</groupId>
    <artifactId>bcprov-jdk16</artifactId>
    <version>1.46</version>
</dependency>
 
 <dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
    <version>1.4</version>
</dependency>
```

## 代码

```java
import com.alibaba.fastjson.JSON;
import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Security;
import java.security.spec.AlgorithmParameterSpec;
import java.util.Map;

/**
 * @author storyxc
 * @description 微信敏感数据对称解密工具类
 * @create 2021/4/30 15:32
 */
public class WeixinDecryptUtils {


    /**
     * 微信加密数据对称解密
     * @param appId       公众号/小程序id
     * @param encryptData   加密数据
     * @param iv          加密初始向量
     * @param sessionKey    会话密钥
     * @return              解密数据
     */
    public static Map<String,Object> decrypt(String appId,String sessionKey,String encryptData,String iv)
            throws Exception{
        byte[] decodeEncryptData = Base64.decodeBase64(encryptData);
        byte[] decodeIv = Base64.decodeBase64(iv);
        byte[] decodeSessionKey = Base64.decodeBase64(sessionKey);
        Security.addProvider(new BouncyCastleProvider());
        AlgorithmParameterSpec ivSpec = new IvParameterSpec(decodeIv);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding","BC");
        SecretKeySpec keySpec = new SecretKeySpec(decodeSessionKey, "AES");
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
        byte[] doFinal = cipher.doFinal(decodeEncryptData);
        String str = new String(doFinal);
        Map map = JSON.parseObject(str, Map.class);
        Map<String,Object> watermark = (Map<String, Object>) map.get("watermark");
        if (watermark != null && !appId.equals(watermark.get("appid"))) {
            throw new RunException(500,"Invalid encrpytedData watermark appId "+appId+",parsed appID " +(String)watermark.get("appid"));
        }
        return map;
    }

    public static void main(String[] args) throws Exception{
        String appId = "wx4f4bc4dec97d474b";
        String sessionKey = "tiihtNczf5v6AKRyjwEUhQ==";
        String encryptedData = "CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZMQmRzooG2xrDcvSnxIMXFufNstNGTyaGS9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+3hVbJSRgv+4lGOETKUQz6OYStslQ142dNCuabNPGBzlooOmB231qMM85d2/fV6ChevvXvQP8Hkue1poOFtnEtpyxVLW1zAo6/1Xx1COxFvrc2d7UL/lmHInNlxuacJXwu0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn/Hz7saL8xz+W//FRAUid1OksQaQx4CMs8LOddcQhULW4ucetDf96JcR3g0gfRK4PC7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns/8wR2SiRS7MNACwTyrGvt9ts8p12PKFdlqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYVoKlaRv85IfVunYzO0IKXsyl7JCUjCpoG20f0a04COwfneQAGGwd5oa+T8yO5hzuyDb/XcxxmK01EpqOyuxINew==";
        String iv = "r7BXXKkLb8qrSNn05n0qiA==";
        Map<String, Object> decode = decrypt(appId, sessionKey, encryptedData, iv);
        System.out.println(JSON.toJSONString(decode));
    }
}
```

