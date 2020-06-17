package com.geovis.ai.util.smart.match;

import java.util.Collection;
import java.util.Map;

import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.MaxCollectionsSizeValidate;

public class MatchMaxCollectionsSizeValidate extends AbstractMatchValidate<MaxCollectionsSizeValidate>
{
  public boolean validate(MaxCollectionsSizeValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    if (value == null)
    {
      return true;
    }

    String defaultMessage = "%s的大小不能大于%s";

    int maxSize = t.size();

    if (value instanceof Collection)
    {
      Collection collection = (Collection)value;

      if (collection.size() > maxSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode() + getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(maxSize) }));
      }

    }
    else if (value instanceof Map)
    {
      Map collection = (Map)value;

      if (collection.size() > maxSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(maxSize) }));
      }

    }
    else if (value.getClass().isArray())
    {
      Object[] array = (Object[])(Object[])value;

      if (array.length > maxSize)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(maxSize) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "MaxCollectionSizeValidate only support  Collection, Map, Array");
    }

    return true;
  }
}