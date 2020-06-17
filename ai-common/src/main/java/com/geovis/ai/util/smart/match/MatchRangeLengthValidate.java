package com.geovis.ai.util.smart.match;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.rule.RangeLengthValidate;

public class MatchRangeLengthValidate extends AbstractMatchValidate<RangeLengthValidate>
{
  public boolean validate(RangeLengthValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的长度必须在%s和%s之间";

    if (value == null)
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
    }

    if (value instanceof String)
    {
      int length = ((String)value).length();

      if ((length < t.min()) || (length > t.max()))
      {
        throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName), Integer.valueOf(t.min()), Integer.valueOf(t.max()) }));
      }

    }
    else
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ "RangeLengthValidate only support String");
    }

    return true;
  }
}