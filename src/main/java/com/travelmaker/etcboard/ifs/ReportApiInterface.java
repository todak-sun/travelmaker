package com.travelmaker.etcboard.ifs;

import com.travelmaker.model.network.Header;

import java.util.List;

public interface ReportApiInterface<Request, Response> {

    Header<List<Response>> readAll();

    Header<Response> readOne(int reno);

    Header<Response> create(Header<Request> request);

    Header<Response> update(Header<Request> request);

    Header delete(int reno);
}
