package com.geovis.ai.util.smart;

import java.lang.annotation.Annotation;
import java.util.HashMap;
import java.util.Map;

import com.geovis.ai.util.smart.rule.MaxValueValidate;
import com.geovis.ai.util.smart.rule.MinLengthValidate;
import com.geovis.ai.util.smart.rule.RangeCollectionsSizeValidate;
import com.geovis.ai.util.smart.match.AbstractMatchValidate;
import com.geovis.ai.util.smart.match.MatchMaxCollectionsSizeValidate;
import com.geovis.ai.util.smart.match.MatchMaxLengthValidate;
import com.geovis.ai.util.smart.match.MatchMaxValueValidate;
import com.geovis.ai.util.smart.match.MatchMinCollectionsSizeValidate;
import com.geovis.ai.util.smart.match.MatchMinLengthValidate;
import com.geovis.ai.util.smart.match.MatchMinValueValidate;
import com.geovis.ai.util.smart.match.MatchNotNullValidate;
import com.geovis.ai.util.smart.match.MatchRangeCollectionsSizeValidate;
import com.geovis.ai.util.smart.match.MatchRangeLengthValidate;
import com.geovis.ai.util.smart.match.MatchRangeValueValidate;
import com.geovis.ai.util.smart.match.MatchRegexpValidate;
import com.geovis.ai.util.smart.rule.MaxCollectionsSizeValidate;
import com.geovis.ai.util.smart.rule.MaxLengthValidate;
import com.geovis.ai.util.smart.rule.MinCollectionsSizeValidate;
import com.geovis.ai.util.smart.rule.MinValueValidate;
import com.geovis.ai.util.smart.rule.NotNullValidate;
import com.geovis.ai.util.smart.rule.RangeLengthValidate;
import com.geovis.ai.util.smart.rule.RangeValueValidate;
import com.geovis.ai.util.smart.rule.RegexpValidate;

public class ValidateRulePool
{
  private static final Map<Class<? extends Annotation>, AbstractMatchValidate<? extends Annotation>> matchValidatePool = new HashMap();

  public static void mount(Class<? extends Annotation> alias, AbstractMatchValidate<? extends Annotation> handler)
  {
    matchValidatePool.put(alias, handler);
  }

  public static AbstractMatchValidate<? extends Annotation> get(Class<? extends Annotation> alias)
  {
    return ((AbstractMatchValidate)matchValidatePool.get(alias));
  }

  static
  {
    mount(MaxLengthValidate.class, new MatchMaxLengthValidate());
    mount(MaxValueValidate.class, new MatchMaxValueValidate());
    mount(MinLengthValidate.class, new MatchMinLengthValidate());
    mount(MinValueValidate.class, new MatchMinValueValidate());
    mount(NotNullValidate.class, new MatchNotNullValidate());
    mount(RangeLengthValidate.class, new MatchRangeLengthValidate());
    mount(RangeValueValidate.class, new MatchRangeValueValidate());
    mount(RegexpValidate.class, new MatchRegexpValidate());
    mount(MaxCollectionsSizeValidate.class, new MatchMaxCollectionsSizeValidate());
    mount(MinCollectionsSizeValidate.class, new MatchMinCollectionsSizeValidate());
    mount(RangeCollectionsSizeValidate.class, new MatchRangeCollectionsSizeValidate());
  }
}