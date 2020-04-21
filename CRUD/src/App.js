import React, { Component } from 'react';
import './dummy.css';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import '@fortawesome/react-fontawesome';
import 'react-fontawesome';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:  1,
        username: "",
        email:"",
        number: "",
        items:[],
        inputtext: [],
        sub: true,
        show:false,
        hide:false
    };
      this.editinfo = this.editinfo.bind(this);
      this.updatefunc = this.updatefunc.bind(this);
      this.showRight = this.showRight.bind(this);
  }
    showRight = () => {
        this.setState({ rightMenu: !this.state.rightMenu });
    };

    handleChange =(e)=>{
      const {name, value} = e.target;

      this.setState({
          [name] : value,
      });
  };
    addWithValidation = () => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = re.test(this.state.email);
        let  no = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let phoneno = no.test(this.state.number);
        if(this.state.sub === true){
            if(this.state.username === '' ){
                alert('Enter the username');
                return false;
            }if(email === false){
                alert('Enter the email ID');
                return false;
            }if(phoneno === false){
                alert('Enter the number');
                return false;
            }else{
                const { items } = this.state;
                items.push({id:this.state.id,username:this.state.username,email: this.state.email, number: this.state.number});
                this.setState({
                    items:items,
                });
                this.setState((prevState)=>({
                    id : prevState.id + 1
                }));
            }
        }
        this.setState({
            username: "",
            email: "",
            number: ""
        })
    };
    updatefunc = () => {
        this.setState({show: !this.state.show});
        const { items } = this.state;
        let upd = {id:this.state.id, username:this.state.username,email: this.state.email, number: this.state.number};
        // let arrayData = this.state.items ;
        let index = items.findIndex((i)=>i.id === upd.id );
        items.splice(index,1,upd);
        this.setState({
            items,
            id:'',
            username : '',
            email : '',
            number : '',
            sub:true,
        });
    };

    deletefun = (ed) => {
        let confirmOk = window.confirm('Are you sure want to delete...');
        if(confirmOk === true){
            let del = this.state.items ;
            del.splice(ed,1);
            console.log('delele....',del.splice(ed,0));
            this.setState({
                items:del
            });
        }else {
            return false;
        }
    };

    editinfo =(data) =>{
       let  datae = this.state.items;
        console.log('edit data....',datae[data]);
        this.setState({show: !this.state.show});
        this.setState({
            id : data.id,
            username: data.username,
            email : data.email,
            number : data.number,
            sub :  false,
        });
            console.log(this.setState.username);
    };
        render() {
            const {id,items,username,email,number}= this.state;
            return (
                <div>
                    <div className ='box'>

                        <h2 className='title center'>Add Data</h2>&nbsp;
                        <label ><i className="fa fa-search"></i>User Name</label>
                        <input type="text" name='username' onChange={(e)=>{this.handleChange(e)}} value={username} className= 'form-control'  /> <br/>
                        <label>Email ID</label>
                        <input type="email" name='email' onChange={(e)=>{this.handleChange(e)}} value={email} className='form-control'/><br/>
                        <label >Contact No.</label>
                        <input type="text" name= 'number'  onChange={(e)=>{this.handleChange(e)}} value={number} className='form-control'/><br/>
                        { this.state.show ? <button color='primary' className='btn btn-danger'onClick={() => this.updatefunc()}>Update</button>: null }
                        { this.state.show ? null : <button color='primary' className='btn btn-primary' name='sub' onChange={(e)=>{this.handleChange(e)}}  onClick={this.addWithValidation} >submit</button> }
                    </div>

                    <div className='tableBox'>
                        <h2 className='center'>Data Table</h2>
                        <Table bordered striped  className ='tableData'>
                            <thead>
                                <th>username</th>
                                <th>email</th>
                                <th>contact</th>
                                <th>Action</th>
                            </thead>
                            <tbody>

                            {items.map((d1,i) =>{
                                return(
                                    <tr>
                                        <td className='none'>{d1.id}</td>
                                        <td>{d1.username}</td>
                                        <td>{d1.email}</td>
                                        <td>{d1.number}</td>
                                        <td>
                                            <button color='primary' className='btn btn-danger' onClick={() => this.deletefun(i)}>Delete</button>&nbsp;
                                            <button color='primary' className='btn btn-info' onClick={() => this.editinfo(d1)}>Edit</button>&nbsp;
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }
}
export default App;