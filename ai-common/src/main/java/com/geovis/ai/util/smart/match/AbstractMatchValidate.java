package com.geovis.ai.util.smart.match;

import java.lang.annotation.Annotation;

import com.geovis.ai.util.smart.SmartValidateException;
import org.apache.commons.lang.StringUtils;

public abstract class AbstractMatchValidate<T extends Annotation>
{
  public abstract boolean validate(T paramT, String paramString, Object paramObject)
    throws SmartValidateException;

  protected String getName(String name, String fieldName)
  {
    if (StringUtils.isEmpty(name))
    {
      return fieldName;
    }

    return name;
  }

  protected String getMessage(String definedMessage, String defaultMessage, Object[] defaultMessageArgus)
  {
    if (StringUtils.isEmpty(definedMessage))
    {
      return String.format(defaultMessage, defaultMessageArgus);
    }

    return definedMessage;
  }
}