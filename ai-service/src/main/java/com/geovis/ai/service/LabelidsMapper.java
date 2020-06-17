package com.geovis.ai.service;

import com.geovis.ai.model.Labelids;
import com.geovis.ai.model.LabelidsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LabelidsMapper {
    long countByExample(LabelidsExample example);

    int deleteByExample(LabelidsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Labelids record);

    int insertSelective(Labelids record);

    List<Labelids> selectByExample(LabelidsExample example);

    Labelids selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Labelids record, @Param("example") LabelidsExample example);

    int updateByExample(@Param("record") Labelids record, @Param("example") LabelidsExample example);

    int updateByPrimaryKeySelective(Labelids record);

    int updateByPrimaryKey(Labelids record);
}