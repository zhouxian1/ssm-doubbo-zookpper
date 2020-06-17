package com.geovis.ai.util.smart.match;

import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.rule.NotNullValidate;

public class MatchNotNullValidate extends AbstractMatchValidate<NotNullValidate>
{
  public boolean validate(NotNullValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s为必填项";

    if ((value == null) || (value.toString().trim().length() == 0))
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName) }));
    }

    return true;
  }
}