package com.geovis.ai.util.smart.match;

import java.util.Collection;
import java.util.Map;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.rule.RangeCollectionsSizeValidate;

public class MatchRangeCollectionsSizeValidate extends AbstractMatchValidate<RangeCollectionsSizeValidate>
{
  public boolean validate(RangeCollectionsSizeValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    int size;
    String defaultMessage = "%s的大小必须在%s和%s之间";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
    }

    if (value instanceof Collection)
    {
      Collection array = (Collection)value;

      size = array.size();

      if ((size < t.min()) || (size > t.max()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
      }

    }
    else if (value instanceof Map)
    {
      Map map = (Map)value;

      size = map.size();

      if ((size < t.min()) || (size > t.max()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
      }

    }
    else if (value.getClass().isArray())
    {
      Object[] array = (Object[])(Object[])value;

      size = array.length;

      if ((size < t.min()) || (size > t.max()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "RangeCollectionSizeValidate only support Collection, Map, Array");
    }

    return true;
  }
}