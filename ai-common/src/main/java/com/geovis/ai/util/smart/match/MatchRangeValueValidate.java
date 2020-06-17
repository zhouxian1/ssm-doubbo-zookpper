package com.geovis.ai.util.smart.match;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.rule.RangeValueValidate;

public class MatchRangeValueValidate extends AbstractMatchValidate<RangeValueValidate>
{
  public boolean validate(RangeValueValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的值必须在%s和%s之间";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.min(), t.max() }));
    }

    if ((value instanceof Integer) || (value instanceof Long) || (value instanceof Byte) || (value instanceof Short))
    {
      Long v = Long.valueOf(Long.parseLong(value.toString()));

      Long max = Long.valueOf(Long.parseLong(t.max()));
      Long min = Long.valueOf(Long.parseLong(t.min()));

      if ((v.longValue() < min.longValue()) || (v.longValue() > max.longValue()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.min(), t.max() }));
      }

    }
    else if ((value instanceof Double) || (value instanceof Float))
    {
      Double v = Double.valueOf(Double.parseDouble(value.toString()));

      Double max = Double.valueOf(Double.parseDouble(t.max()));
      Double min = Double.valueOf(Double.parseDouble(t.min()));

      if ((v.doubleValue() < min.doubleValue()) || (v.doubleValue() > max.doubleValue()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.min(), t.max() }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "RangeValueValidate only support int|long|byte|short|double|float");
    }

    return true;
  }
}