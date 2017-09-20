import React, {Component} from 'react';

class Master extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid text-center">
                        <h3>Login</h3>
                    </div>
                </nav>
                <form action="#" method="post">
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <label htmlFor="email">Email Id :</label>
                            <input type="email" id="email"
                                   required name="email" className="form-control"/>
                        </div>
                        <div className="col-lg-6 col-lg-offset-3">
                            <label htmlFor="email">Password :</label>
                            <input type="password" id="password" required name="password" className="form-control"/>
                        </div>
                        <div className="col-lg-6 col-lg-offset-3 text-center">
                            <br/>
                            <input type="submit" id="login" name="login" value="Login" className="btn btn-success"/>
                            &nbsp;
                            <input type="button" id="cancel" name="cancel" value="cancel" className="btn btn-default"/>
                        </div>
                        <div className="col-lg-6 col-lg-offset-3 text-center">
                            <br/>
                            <a href="#">Forgotten account?</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Master;