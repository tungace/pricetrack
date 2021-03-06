import React, { Component } from "react"

import Layout from "../components/layout"
import CrawlerStatus from "../components/Block/CrawlerStatus"
import Stats from "../components/Block/Stats"
import HeadSlogan from "../components/Block/HeadSlogan";

/**
 * This page is ad hoc, please modify it
 */

export default class IndexComponent extends Component {
    about_image = '//images.unsplash.com/photo-1533727352519-7553fbcbf061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80'
    about_image_credit = 'Photo by Alvaro Reyes on Unsplash'

    render() {
        return (
          <Layout>
                <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm" style={{background: '#03A9F4'}}>
                    <HeadSlogan icon="image" sub_headline="Giới thiệu" />
                </div>

                <div className="my-3 p-3 bg-white rounded shadow-sm row">
                    <div className="col mb-3">
                        Pricetrack là ứng dụng theo dõi giá trên các trang TMDT lớn như tiki.vn, shopee.vn,... hoàn toàn miễn phí <br />
                        Pricetrack có thể sẽ được một phần hoa hồng nhỏ khi bạn mua sản phẩm. <br />
                        Pricetrack là phần mềm <a href="https://github.com/duyetdev/pricetracker" target="_blank" rel="noopener noreferrer">nguồn mở</a>. <br />

                        <br /><br />
                        <h4>Trạng thái hệ thống</h4>
                        <CrawlerStatus />

                        <h4>Thống kê</h4>
                        <Stats />

                        <br />
                        <hr />
                        Liên hệ me [at] duyet dot net
                    </div>
                    
                    <div className="col-md-5 col-xs-12 text-center">
                        <img className="img-fluid " src={this.about_image} alt="" />
                        <small>{this.about_image_credit}</small>
                    </div>
                </div>

          </Layout>
        )
    }
}