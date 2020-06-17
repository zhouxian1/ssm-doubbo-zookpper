package com.geovis.ai.util;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class AES
{
  public static String encrypt(String sSrc, String sKey)
    throws Exception
  {
    if (sKey == null) {
      System.out.print("Key为空null");
      return null;
    }

    if (sKey.length() != 16) {
      System.out.print("Key长度不是16位");
      return null;
    }
    byte[] raw = sKey.getBytes();
    SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    IvParameterSpec iv = new IvParameterSpec("0102030405060708".getBytes());
    cipher.init(1, skeySpec, iv);

    byte[] encrypted = cipher.doFinal(sSrc.getBytes());

    String encode = new BASE64Encoder().encode(encrypted);
    //encode = prepareAfterBase64Encode(encode);
    return encode;
  }

  public static String decrypt(String sSrc, String sKey) throws Exception
  {
    try
    {
      if (sKey == null) {
        System.out.print("Key为空null");
        return null;
      }

      if (sKey.length() != 16) {
        System.out.print("Key长度不是16位");
        return null;
      }
      byte[] raw = sKey.getBytes("UTF-8");
      SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      IvParameterSpec iv = new IvParameterSpec("0102030405060708".getBytes());

      cipher.init(2, skeySpec, iv);

      String decode =  sSrc; //prepareBeforeBase64Decode(sSrc);
      byte[] encrypted1 = new BASE64Decoder().decodeBuffer(decode);
      try
      {
        byte[] original = cipher.doFinal(encrypted1);
        String originalString = new String(original);
        return originalString;
      } catch (Exception e) {
        System.out.println(e.toString());
        return null;
      }
    } catch (Exception ex) {
      System.out.println(ex.toString()); }
    return null;
  }

  private static String prepareBeforeBase64Decode(String Token)
  {
    Token = Token.replace("-", "+").replace("_", "/").replace(".", "=");
    return Token;
  }

  private static String prepareAfterBase64Encode(String Token)
  {
    Token = Token.replace("+", "-").replace("/", "_").replace("=", ".").replaceAll("(\r\n|\n\r|\r|\n)", "");
    return Token;
  }

  public static void main(String[] args)
    throws Exception
  {
    String key = "abcdefgabcdefg12";
    String content = "我爱你";  
    System.out.println("加密前：" + content);  

    System.out.println("加密密钥和解密密钥：" + key);  

    String encrypt = encrypt(content, key);  
    System.out.println("加密后：" + encrypt);  

    String decrypt = decrypt(encrypt, key);  
    System.out.println("解密后：" + decrypt);
    
    System.out.println(StringUtil.getRandomString(16));
    
  }
}