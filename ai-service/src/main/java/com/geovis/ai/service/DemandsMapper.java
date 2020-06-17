package com.geovis.ai.service;

import com.geovis.ai.model.Demands;
import com.geovis.ai.model.DemandsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DemandsMapper {
    long countByExample(DemandsExample example);

    int deleteByExample(DemandsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Demands record);

    int insertSelective(Demands record);

    List<Demands> selectByExampleWithBLOBs(DemandsExample example);

    List<Demands> selectByExample(DemandsExample example);

    Demands selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Demands record, @Param("example") DemandsExample example);

    int updateByExampleWithBLOBs(@Param("record") Demands record, @Param("example") DemandsExample example);

    int updateByExample(@Param("record") Demands record, @Param("example") DemandsExample example);

    int updateByPrimaryKeySelective(Demands record);

    int updateByPrimaryKeyWithBLOBs(Demands record);

    int updateByPrimaryKey(Demands record);
}