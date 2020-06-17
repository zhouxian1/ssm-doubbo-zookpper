package com.geovis.ai.util.smart.match;

import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.MaxValueValidate;

public class MatchMaxValueValidate extends AbstractMatchValidate<MaxValueValidate>
{
  public boolean validate(MaxValueValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    if (value == null)
    {
      return true;
    }

    String defaultMessage = "%s的值不能大于%s";

    if ((value instanceof Integer) || (value instanceof Long) || (value instanceof Byte) || (value instanceof Short))
    {
      Long v = Long.valueOf(Long.parseLong(value.toString()));

      Long max = Long.valueOf(Long.parseLong(t.value()));

      if (v.longValue() > max.longValue())
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.value() }));
      }

    }
    else if ((value instanceof Double) || (value instanceof Float))
    {
      Double v = Double.valueOf(Double.parseDouble(value.toString()));

      Double max = Double.valueOf(Double.parseDouble(t.value()));

      if (v.doubleValue() > max.doubleValue())
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), t.value() }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+"MaxValueValidate only support int|long|byte|short|double|float");
    }

    return true;
  }
}