package com.geovis.ai.util.smart.match;

import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.MaxLengthValidate;

public class MatchMaxLengthValidate extends AbstractMatchValidate<MaxLengthValidate>
{
  public boolean validate(MaxLengthValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    if (value == null)
    {
      return true;
    }

    String defaultMessage = "%s的长度不能大于%s";

    if (value instanceof String)
    {
      int maxLength = t.length();

      if (((String)value).length() > maxLength)
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.length()) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+"MaxLengthValidate only support String");
    }

    return true;
  }
}