package com.travelmaker.etcboard.dao;

import com.travelmaker.etcboard.domain.ReportDTO;

import java.util.List;

public interface ReportDAO {
    ReportDTO readOne(int reno);

    List<ReportDTO> readAll();

    ReportDTO create(ReportDTO reportDTO);

    ReportDTO update(ReportDTO reportDTO);

    void delete(int rno);
}
