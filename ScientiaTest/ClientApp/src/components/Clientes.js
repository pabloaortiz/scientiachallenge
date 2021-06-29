import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { TrashIcon, EditIcon } from 'react-line-awesome'
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class Clientes extends Component {
    static displayName = Clientes.name;

    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            columns: [],
            loading: true,
            IsVisible: false,
            confirmar: false,
            id: "",
            cuit: "",
            nombre: "",
            apellido: "",
            email: ""
        };
        this.modalToggle = this.modalToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
        this.saveCliente = this.saveCliente.bind(this);
        this.confirmToggle = this.confirmToggle.bind(this);
        this.delCliente = this.delCliente.bind(this);
        this.showConfirmar = this.showConfirmar.bind(this);
    }

    componentDidMount() {
        this.setState({
            columns: [
                {
                    name: 'CUIT',
                    selector: 'cuit',
                    sortable: true
                },
                {
                    name: 'Apellido',
                    selector: 'apellido',
                    sortable: true
                },
                {
                    name: 'Nombre',
                    selector: 'nombre',
                    sortable: true
                },
                {
                    name: 'Email',
                    selector: 'email',
                    sortable: true
                },
                {
                    name: 'Acciones',
                    button: true,
                    cell: row => {
                        return (
                            <Row>
                                <Col>
                                    <a className="h4" title="Editar" href="." onClick={(event) => this.showUpdate(event, row)}><EditIcon /></a>
                                    <a className="h4" title="Eliminar" href="." onClick={(event) => this.showConfirmar(event, row.id)}><TrashIcon/></a>
                                </Col>
                            </Row>
                        );
                    }
                }
            ]
        });
        this.populateClientes();
    }

    modalToggle = () => {
        this.setState(
            {
                IsVisible: !this.state.IsVisible
            }
        );
    }

    confirmToggle = () => {
        this.setState(
            {
                confirmar: !this.state.confirmar
            }
        );
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    showCreate = () => {
        this.setState(
            {
                id: 0,
                cuit: "",
                nombre: "",
                apellido: "",
                email: "",
                IsVisible: true
            }
        );
    }

    showConfirmar(event, id) {
        event.preventDefault();
        this.setState({
            id: id,
            confirmar: true
        });
    }

    showUpdate(event, row) {
        event.preventDefault();
        this.setState(
            {
                id: row.id,
                cuit: row.cuit,
                nombre: row.nombre,
                apellido: row.apellido,
                email: row.email,
                IsVisible: true
            }
        );
    }

    async saveCliente() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        const cliente = {
            Id: 0,
            CUIT: this.state.cuit,
            Apellido: this.state.apellido,
            Nombre: this.state.nombre,
            Email: this.state.email
        };

        var raw = JSON.stringify(cliente);

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        if (this.state.id === 0) {
            await fetch("api/clientes", requestOptions)
        }
        else {
            requestOptions.method = "PUT";
            await fetch("api/clientes/" + this.state.id, requestOptions)
        }
        this.setState({
            IsVisible: false
        });
        this.populateClientes();
    }

    async delCliente() {
        await fetch("api/clientes/" + this.state.id, {
            method: 'DELETE'
        });
        this.setState({
            confirmar: false
        });
        this.populateClientes();
    }

    static renderClientesTable(columns, clientes) {
        return (
            <DataTable title="Clientes" columns={columns}
                data={clientes} />
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Clientes.renderClientesTable(this.state.columns, this.state.clientes);

        return (
            <div>
                <h1 id="tabelLabel" >Listado de clientes</h1>
                <p>Este componente obtiene un listado de clientes del servidor.</p>
                <Row>
                    <Col className="text-right">
                        <Button color="primary" onClick={this.showCreate}>Nuevo cliente</Button>
                    </Col>
                </Row>
                {contents}
                <Modal isOpen={this.state.IsVisible} toggle={this.modalToggle}>
                    <ModalHeader toggle={this.modalToggle}>Agregar/Editar cliente</ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>CUIT</Label>
                                <AvField name="cuit" type="text" onChange={this.handleChange} value={this.state.cuit} validate={{
                                    required: { value: true, errorMessage: 'Ingrese el CUIT de cliente' }
                                }}></AvField>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <AvField name="nombre" type="text" onChange={this.handleChange} value={this.state.nombre} validate={{
                                    required: { value: true, errorMessage: 'Ingrese el nombre de cliente' }
                                }}></AvField>
                            </FormGroup>
                            <FormGroup>
                                <Label>Apellido</Label>
                                <AvField name="apellido" type="text" onChange={this.handleChange} value={this.state.apellido} validate={{
                                    required: { value: true, errorMessage: 'Ingrese el apellido de cliente' }
                                }}></AvField>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <AvField name="email" type="email" onChange={this.handleChange} value={this.state.email} validate={{
                                    required: { value: true, errorMessage: 'Ingrese el email del cliente' },
                                    email: { value: true, errorMessage: 'Email no valido' }
                                }}></AvField>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveCliente}>Guardar</Button>{' '}
                        <Button color="secondary" onClick={this.modalToggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.confirmar} toggle={this.confirmToggle}>
                    <ModalHeader toggle={this.confirmToggle}>Confirmación</ModalHeader>
                    <ModalBody>
                        <p>¿Desea eliminar el cliente seleccinado?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.delCliente}>Si</Button>{' '}
                        <Button color="secondary" onClick={this.confirmToggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    async populateClientes() {
        const response = await fetch('api/clientes');
        const data = await response.json();
        this.setState({ clientes: data, loading: false });
    }
}
