package com.geovis.ai.util.smart;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import com.geovis.ai.util.smart.match.AbstractMatchValidate;
import org.apache.log4j.Logger;

public class SmartValidate {
	private static final SmartValidate self = new SmartValidate();
	private static final Logger logger = Logger.getLogger("SmartValidate");

	public static void validate(Object target) throws SmartValidateException {
		if (target == null)
			return;

		self.recursiveUnitlPrimitiveType(target, target.getClass());
	}

	private void recursiveUnitlPrimitiveType(Object target, Class<?> clazz) throws SmartValidateException {
		if (target == null) {
			return;
		}

		if (!(isSmartValidateJavaBean(clazz))) {
			logger.debug(clazz + " is neither SmartValidateJavaBean or Map or Collection or Array ");
			return;
		}

		Field[] arr$ = clazz.getDeclaredFields();
		int len$ = arr$.length;
		for (int i$ = 0; i$ < len$; ++i$) {
			Field field = arr$[i$];

			if (!(Modifier.isStatic(field.getModifiers()))) {
				if (!(Modifier.isPrivate(field.getModifiers()))) {
					break;
				}
				try {
					Iterator iterator;
					Object next;
					Class type = field.getType();

					PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);

					Object value = pd.getReadMethod().invoke(target, new Object[0]);

					validateField(field, value);

					if (value == null) {
						break;
					}

					if (Collection.class.isAssignableFrom(type)) {
						Collection c = (Collection) value;
						iterator = c.iterator();
						while (iterator.hasNext()) {
							next = iterator.next();
							if (next != null)
								recursiveUnitlPrimitiveType(next, next.getClass());
						}

					} else if (Map.class.isAssignableFrom(type)) {
						Map map = (Map) value;
						iterator = map.values().iterator();
						while (iterator.hasNext()) {
							next = iterator.next();
							if (next != null)
								recursiveUnitlPrimitiveType(next, next.getClass());
						}

					} else if (type.isArray()) {
						Object[] array = (Object[]) (Object[]) value;
						for (int i = 0; i < array.length; ++i) {
							next = array[i];
							if (next != null)
								recursiveUnitlPrimitiveType(next, next.getClass());
						}
					} else {
						recursiveUnitlPrimitiveType(value, value.getClass());
					}
				} catch (IllegalArgumentException | IntrospectionException | IllegalAccessException
						| InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		if ((clazz.getSuperclass() != null) && (clazz.getSuperclass() != Object.class))
			recursiveUnitlPrimitiveType(target, clazz.getSuperclass());
	}

	private boolean isSmartValidateJavaBean(Class<?> clazz) {
		return (clazz.getAnnotation(Validate.class) != null);
	}

	private void validateField(Field field, Object value) throws SmartValidateException {
		Annotation[] arr$ = field.getAnnotations();
		int len$ = arr$.length;
		for (int i$ = 0; i$ < len$; ++i$) {
			Annotation anno = arr$[i$];

			AbstractMatchValidate matchValidate = ValidateRulePool.get(anno.annotationType());

			if (matchValidate == null){
				break;
			}
				
			matchValidate.validate(anno, field.getName(), value);
		}
	}
}