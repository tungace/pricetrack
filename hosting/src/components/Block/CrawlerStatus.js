import React, { Component } from "react"
import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

let LogoOrDomain = ({logo, domain}) => {
    if (logo) 
        return (<img src={logo} className="img-fluid" style={{width: 100}} title={domain} alt={domain} />)
    return domain || null
}

export default class CrawlerStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: {},
            info: {},
            credits: {},

            loading: false,
            error: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/api/about')
            .then(response => {
                let { info, status, credits } = response.data
                this.setState({ info, status, credits, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false, error: true })
            })
    }


    render() {
        if (this.state.loading) return 'Loading ...'
        if (!Object.keys(this.state.status).length) return 'No info'

        let active = <FontAwesomeIcon icon={faCheckCircle} color="green" />
        let deactive = <FontAwesomeIcon icon={faTimesCircle} color="red" />

        let _table = []
        for (let index in this.state.status) {
            let domain = this.state.status[index]

            let row = (<tr key={domain.domain}>
              <th scope="row">
                <LogoOrDomain logo={domain.logo} domain={domain.domain} />
            </th>
              <td>{domain.time_check} phút</td>
              <td>{domain.active ? active : deactive}</td>
            </tr>)
            _table.push(row)
        }

        return (<table className="table">
                <thead>
                <tr>
                  <th scope="col">Dịch vụ</th>
                  <th scope="col">Thời gian cập nhật</th>
                  <th scope="col text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>{_table}</tbody>
        </table>)
    }
}