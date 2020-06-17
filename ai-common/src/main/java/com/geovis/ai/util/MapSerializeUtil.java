package com.geovis.ai.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class MapSerializeUtil
{
  public static Map<String, String> ConvertBytes2Map(byte[] dataBytes)
    throws Exception
  {
    Map map = new HashMap();
    int offset = 0;
    String key = null; String value = null;
    byte[] lengthBytes = new byte[4];
    int value_len = 0;
    while (dataBytes.length > offset)
    {
      System.arraycopy(dataBytes, offset, lengthBytes, 0, 4);
      int key_len = my_bb_to_int(lengthBytes);
      if (key_len == 0)
        break;
      offset += 4;
      byte[] keyBytes = new byte[key_len];
      System.arraycopy(dataBytes, offset, keyBytes, 0, key_len);
      key = new String(keyBytes, "UTF-8");
      offset += key_len;

      System.arraycopy(dataBytes, offset, lengthBytes, 0, 4);
      value_len = my_bb_to_int(lengthBytes);
      offset += 4;

      if (value_len > 0) {
        byte[] valueBytes = new byte[value_len];
        System.arraycopy(dataBytes, offset, valueBytes, 0, value_len);
        value = new String(valueBytes, "UTF-8");
        offset += value_len;
      }
      map.put(key, value);
    }
    return map;
  }

  public static byte[] ConvertMap2Bytes(Map<String, String> map)
    throws IOException
  {
    ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
    for (Iterator i$ = map.entrySet().iterator(); i$.hasNext(); ) { Entry entry = (Entry)i$.next();
      String key = (String)entry.getKey();

      byte[] keybytes = key.getBytes();
      int keybytes_leng = keybytes.length;
      byte[] keybytes_lengbytes = my_int_to_bb(keybytes_leng);
      byteStream.write(keybytes_lengbytes);
      byteStream.write(keybytes);

      String value = (String)entry.getValue();
      byte[] valuebytes = value.getBytes();
      int valuebytes_leng = valuebytes.length;
      byte[] valuebytes_lengbytes = my_int_to_bb(valuebytes_leng);
      byteStream.write(valuebytes_lengbytes);
      byteStream.write(valuebytes);
    }
    return byteStream.toByteArray();
  }

  public static byte[] my_int_to_bb(int myInteger) {
    return ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(myInteger).array();
  }

  public static int my_bb_to_int(byte[] byteBarray) {
    return ByteBuffer.wrap(byteBarray).order(ByteOrder.LITTLE_ENDIAN).getInt();
  }

  public static void main(String[] args) throws Exception {
    Map map = new HashMap();
    String value = "{\"accountId\":\"ff8080814d21d093014d21d093030000\",\"memberId\":\"ff8080814d21d093014d21d093260000\",\"name\":\"湿哒哒\",\"sourceType\":0}}";
    map.put("key", value);
    byte[] datas = ConvertMap2Bytes(map);
    System.out.println(datas.length);
    map = ConvertBytes2Map(datas);
    System.out.print((String)map.get("key"));
  }
}