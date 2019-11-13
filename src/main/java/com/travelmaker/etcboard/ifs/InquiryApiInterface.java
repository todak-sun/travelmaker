package com.travelmaker.etcboard.ifs;

import com.travelmaker.model.network.Header;

import java.util.List;

public interface InquiryApiInterface<Request, Response> {

    Header<Response> readOne(int iqno);

    Header<List<Response>> readAll();

    Header<Response> create(Header<Request> request);

    Header<Response> update(Header<Request> request);

    Header delete(int iqno);

}
