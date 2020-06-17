package com.geovis.ai.service;

import com.geovis.ai.model.Plugins;
import com.geovis.ai.model.PluginsExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PluginsMapper {
    long countByExample(PluginsExample example);

    int deleteByExample(PluginsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Plugins record);

    int insertSelective(Plugins record);

    List<Plugins> selectByExampleWithBLOBs(PluginsExample example);

    List<Plugins> selectByExample(PluginsExample example);

    Plugins selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Plugins record, @Param("example") PluginsExample example);

    int updateByExampleWithBLOBs(@Param("record") Plugins record, @Param("example") PluginsExample example);

    int updateByExample(@Param("record") Plugins record, @Param("example") PluginsExample example);

    int updateByPrimaryKeySelective(Plugins record);

    int updateByPrimaryKeyWithBLOBs(Plugins record);

    int updateByPrimaryKey(Plugins record);
}