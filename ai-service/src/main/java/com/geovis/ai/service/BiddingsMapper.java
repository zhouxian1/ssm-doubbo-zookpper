package com.geovis.ai.service;

import com.geovis.ai.model.Biddings;
import com.geovis.ai.model.BiddingsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BiddingsMapper {
    long countByExample(BiddingsExample example);

    int deleteByExample(BiddingsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Biddings record);

    int insertSelective(Biddings record);

    List<Biddings> selectByExampleWithBLOBs(BiddingsExample example);

    List<Biddings> selectByExample(BiddingsExample example);

    Biddings selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Biddings record, @Param("example") BiddingsExample example);

    int updateByExampleWithBLOBs(@Param("record") Biddings record, @Param("example") BiddingsExample example);

    int updateByExample(@Param("record") Biddings record, @Param("example") BiddingsExample example);

    int updateByPrimaryKeySelective(Biddings record);

    int updateByPrimaryKeyWithBLOBs(Biddings record);

    int updateByPrimaryKey(Biddings record);
}