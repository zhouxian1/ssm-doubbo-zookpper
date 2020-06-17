package com.geovis.ai.util.smart.match;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.MinLengthValidate;
import com.geovis.ai.constants.HttpStatus;

public class MatchMinLengthValidate extends AbstractMatchValidate<MinLengthValidate>
{
  public boolean validate(MinLengthValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的长度不能小于%s";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.length()) }));
    }

    if (value instanceof String)
    {
      int minLength = t.length();

      if (((String)value).length() < minLength)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.length()) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "MinLengthValidate only support String");
    }

    return true;
  }
}