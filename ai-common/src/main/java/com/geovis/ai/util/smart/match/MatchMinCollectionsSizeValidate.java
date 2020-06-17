package com.geovis.ai.util.smart.match;

import java.util.Collection;
import java.util.Map;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.rule.MinCollectionsSizeValidate;

public class MatchMinCollectionsSizeValidate extends AbstractMatchValidate<MinCollectionsSizeValidate>
{
  public boolean validate(MinCollectionsSizeValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的大小不能小于%s";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.size()) }));
    }

    int minSize = t.size();

    if (value instanceof Collection)
    {
      Collection collection = (Collection)value;

      if (collection.size() < minSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(minSize) }));
      }

    }
    else if (value instanceof Map)
    {
      Map map = (Map)value;

      if (map.size() < minSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(minSize) }));
      }

    }
    else if (value.getClass().isArray())
    {
      Object[] array = (Object[])(Object[])value;

      if (array.length < minSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(minSize) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+"MinCollectionSizeValidate only support  Collection, Map, Array");
    }

    return true;
  }
}