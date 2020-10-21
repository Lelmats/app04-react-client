import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


export default class EditTaco extends Component{

    
    state = {
        taco: {},
        name: '',
        quantity: 0,
        pica: 'si',
        //nameField: this.nameFieldStart()
        showModal: false
    }

    catchName = event => this.setState({name: event.target.value});
    catchQuantity = event => this.setState({quantity: event.target.value});
    catchSpacyness = event => this.setState({pica: event.target.value});

    componentDidMount(){
        const tacoId = this.props.history.location.state.tacoId;
        axios.get(`http://localhost:5000/${tacoId}`)
        .then(reponse => reponse.data)
        .then(taco => {
            this.setState({taco: taco})
            console.log(this.state.taco)
        });
    }

    saveChanges = () => {
        this.handleClose();
        const {taco, name, quantity, pica} = this.state;
        axios.put(`http://localhost:5000/${taco.id}`, {
            name: name,
            quantity: quantity,
            pica: pica
        });
        this.props.history.push('/');
    }

    handleClose = () => {
        this.setState({showModal: false});
        //console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        //console.log(this.state.showModal);
    }

    handleCloseDelete = () => {
        this.setState({showModalDel: false});
        //console.log(this.state.showModal);
    }
    
    handleShowDelete = () => {
        this.setState({showModalDel: true});
        //console.log(this.state.showModal);
    }
    handleCloseData = () => {
        this.setState({showModalDa: false});
        //console.log(this.state.showModal);
    }
    
    handleShowData = () => {
        this.setState({showModalDa: true});
        //console.log(this.state.showModal);
    }

    deleteTaco = id =>{
        axios.delete(`http://localhost:5000/${id}`)
        .then(data => this.props.history.push("/"))
        
    }

    checkblank = () =>
    {
        if (this.state.name === " " || this.state.quantity === 0) 
        {
            this.handleShowData();
        }
    }
        
    
    /*nameFieldStart = ()=>{
        return <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                </div>
                <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                type="text" name="" id="taco-name" placeholder='eje: tu taco'
                aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.name}/>
            </div>; 
    } 
    
    nameFieldEdit = ()=> <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                        </div>
                        <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                        type="text" name="" id="taco-name" placeholder='eje: tu taco'
                        aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </div>; 

    editName = ()=>{
        this.setState({nameField: this.nameFieldEdit});
        console.log('click');
    }*/

    render() {
        const {id, name, quantity, pica, showModal} = this.state.taco;
        return (
             <Fragment>
                <h3>Editar taco:</h3>
                    <br/>
                    <div className='form-group' style={{width: '50%'}}>
                    <label>{`valor actual: ${name}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                            type="text" name="" id="taco-name" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>

                        <label>{`valor actual: ${quantity}`}</label>
                        <div className="input-group mb-3">
                            
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input onChange={this.catchQuantity} className='form-control' 
                            type="number" name="" id="taco-quantity" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <label>{`Valoe actual: ${pica}`}</label>
                        <span>¿Es picante? (Si/No):</span>
                        <div>
                            <label htmlFor="option-spyciness"></label>
                            <select className='custom-select custom-select-lg mb-3' onChange={this.catchSpacyness} id="option-spyciness" name="option-spyciness" style={{width: '20%'}}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <button onClick={this.handleShow} className='btn btn-secondary' id="btn-post-taco">Guardar</button>
                            <button onClick={this.handleShowDelete} className='btn btn-danger' id="btn-post-taco">Eliminar</button>
                            
                        </div>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar cambios</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>¿Estas Seguro que quieres guardar estos cambios?</p>
                        <div className="row">
                        <div className="col-md-5">
                        <h4>Valores Viejos: </h4>
                            <h5>Nombre Taco:</h5>
                            <div>{name}</div>
                            <h5>Cantidad Taco:</h5>
                            <div>{quantity}</div>
                            <h5>Es picante:</h5>
                            <div>{pica}</div>
                        </div>
                        <div className="col-md-7" >
                        <div> 
                        <h4>Valores Nuevos: </h4>
                            <h5>Nombre Taco:</h5>
                            <div>{this.state.name}</div>
                            <h5>Cantidad Taco:</h5>
                            <div>{this.state.quantity}</div>
                            <h5>Es picante:</h5>
                            <div>{this.state.pica}</div>
                        </div>
                        </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleClose}>Cancelar</button>
                            <button variant="primary" onClick={this.saveChanges}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalDel} onHide={this.handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>WARNING MADA</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        You sure nigg?
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleCloseDelete}>Cancelar</button>
                            <button variant="primary" onClick={()=>this.deleteTaco(id)}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalDa} onHide={this.handleCloseData}>
                        <Modal.Header closeButton>
                            <Modal.Title>ERROR</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        Escribe bien puñeta
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleCloseData}>:C</button>
                        </Modal.Footer>
                    </Modal>
                    
            </Fragment>
        );
    }
}