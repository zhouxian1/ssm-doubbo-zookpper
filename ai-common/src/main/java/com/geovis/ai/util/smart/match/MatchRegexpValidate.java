package com.geovis.ai.util.smart.match;

import java.util.regex.Pattern;

import com.geovis.ai.constants.HttpStatus;
import com.geovis.ai.util.smart.SmartValidateException;
import com.geovis.ai.util.smart.rule.RegexpValidate;

public class MatchRegexpValidate extends AbstractMatchValidate<RegexpValidate>
{
  public boolean validate(RegexpValidate t, String fieldName, Object value)
    throws SmartValidateException
  {
    String defaultMessage = "%s的格式错误";

    if ((value == null) || (!(Pattern.matches(t.pattern(), value.toString()))))
    {
      throw new SmartValidateException(HttpStatus.BAD_REQUEST.getStatusCode()+ getMessage(t.message(), defaultMessage, new Object[] { getName(t.name(), fieldName) }));
    }

    return false;
  }
}