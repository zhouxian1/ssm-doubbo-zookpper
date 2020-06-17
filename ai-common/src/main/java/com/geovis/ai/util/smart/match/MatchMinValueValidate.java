package com.geovis.ai.util.smart.match;

import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.MinValueValidate;

public class MatchMinValueValidate extends AbstractMatchValidate<MinValueValidate>
{
  public boolean validate(MinValueValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的值不能小于%s";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.value() }));
    }

    if ((value instanceof Integer) || (value instanceof Long) || (value instanceof Byte) || (value instanceof Short))
    {
      Long v = Long.valueOf(Long.parseLong(value.toString()));

      Long min = Long.valueOf(Long.parseLong(t.value()));

      if (v.longValue() < min.longValue())
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.value() }));
      }

    }
    else if ((value instanceof Double) || (value instanceof Float))
    {
      Double v = Double.valueOf(Double.parseDouble(value.toString()));

      Double min = Double.valueOf(Double.parseDouble(t.value()));

      if (v.doubleValue() < min.doubleValue())
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.value() }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "MinValueValidate only support int|long|byte|short|double|float");
    }

    return true;
  }
}