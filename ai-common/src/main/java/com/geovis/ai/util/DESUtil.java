package com.geovis.ai.util;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/*import org.apache.commons.codec.binary.Base64;*/

public class DESUtil
{
  /*private static String KEYSTR = "-7-*d@#5EdxBvrTRe-#5CtUs";

  private static Key getKey()
  {
    SecretKey key = new SecretKeySpec(KEYSTR.getBytes(), "TripleDES");
    return key;
  }

  public static byte[] encrypt(byte[] inputByte) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException {
    Cipher encrypt = Cipher.getInstance("TripleDES");
    encrypt.init(1, getKey());
    byte[] ciperByte = encrypt.doFinal(inputByte);
    byte[] encode = Base64.encodeBase64(ciperByte);
    return encode;
  }

  public static byte[] decrypt(byte[] inputByte) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException {
    byte[] encodeStr = Base64.decodeBase64(inputByte);
    Cipher decrypt = Cipher.getInstance("TripleDES");
    decrypt.init(2, getKey());
    byte[] ciperByte = decrypt.doFinal(encodeStr);
    return ciperByte;
  }*/
}