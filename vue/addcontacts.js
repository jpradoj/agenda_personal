Vue.component('addcontact',{
	data(){
		return{
			form:{
		      	firstName:'',
		  		lastName:'',
		  		birthDate:'',
		  		sex:'',
		  		country:'',
		  		state:'',
		  		city:'',
		  		address:'',
		  		email:'',
		  		mobilePhone:'',
	  		},
		  	countries:null,
		  	states:null,
		  	cities:null,
		  	error:false
		}
  	},
	methods:{
		showModal(){
	        this.myModal = new bootstrap.Modal(document.getElementById('formAdd'), {})
	        this.myModal.show()
    	},
		onSubmit(event){
			event.preventDefault();
			const path = window.location.origin+window.location.pathname;
			let post = {
				firstName:this.form.firstName,
				lastName:this.form.lastName,
				birthDate:moment(this.form.birthDate).format('YYYY-MM-DD'),
				sex:this.form.sex,
				Country:this.form.country,
				State:this.form.state,
				City:this.form.city,
				Address:this.form.address,
				Email:this.form.email,
				MobilePhone:this.form.mobilePhone,
			};
			axios
				.post(path+"php/addContact.php", post)
				.then((response=>{
					if(response['data']){
						this.$refs.Close.click();
						this.$emit("recargar");
					}else{
						this.error=true;
					}
				}))
				.catch(error => {
			    console.log("Errors= " + this.errors)
			    this.error=true;
			})
		},
		onChangeCountry(event){
			const path = window.location.origin+window.location.pathname;
			axios
		      	.get(path+'php/getStates.php',{
			      	params:{
			      		idCountry:event.target.value
			      	}
		      	})
		      	.then(response => (this.states = response['data']))
		},
		onChangeState(event){
			const path = window.location.origin+window.location.pathname;
			axios
		      	.get(path+'php/getCities.php',{
			      	params:{
			      		idState:event.target.value,
			      		idCountry:this.form.country
			      	}
		      	})
		      	.then(response => (this.cities = response['data']))
		},
		onReset(event){
			this.form.firstName='',
	  		this.form.lastName='',
	  		this.form.birthDate='',
	  		this.form.sex='',
	  		this.form.country='',
	  		this.form.state='',
	  		this.form.city='',
	  		this.form.address='',
	  		this.form.email='',
	  		this.form.mobilePhone=''
	  		this.error=false;
		},
	},

	mounted () {
		const path = window.location.origin+window.location.pathname
	    axios
	      .get(path+'php/getCountry.php')
	      .then(response => (this.countries = response['data']))
	},

	template:`
		<div class="modal fade" id="formAdd" tabindex="-1" aria-labelledby="formAdd" aria-hidden="true"  >
		  	<div class="modal-dialog">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<h5 class="modal-title" id="exampleModalLabel">Agregar Contacto</h5>
		        		<button type="button" ref="Close" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click='onReset'></button>
		      		</div>
		      		<div class="modal-body">

		      			<div class="alert alert-warning d-flex align-items-center" role="alert" v-if="error">
						  	<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
						  	<div>
						    	Ha ocurrido un error, verifique los datos e intenete nuevamente.
						  	</div>
						</div>

		        		<form class="row g-3" v-on:submit="onSubmit">
					        <div class="col-md-6">
							    <label for="firstname" class="form-label">Nombre</label>
							    <input type="text" class="form-control" id="firstName" v-model="form.firstName" required>
							</div>
							<div class="col-md-6">
							    <label for="lastName" class="form-label">Apellido</label>
							    <input type="text" class="form-control" id="lastName" v-model="form.lastName" required>
							</div>

							<div class="col-md-4">
							    <label for="birthDate" class="form-label">Nacimiento</label>
							    <input type="date" class="form-control" id="birthDate" v-model="form.birthDate" required>
							</div>
							 <div class="col-md-4">
							    <label for="sex" class="form-label">Sexo</label>
							    <select class="form-select" aria-label="Default select example" id="sex" v-model="form.sex" required>
							  		<option value="M">Masculino</option>
									<option value="F">Femenimo</option>
								</select>
							</div>
							 <div class="col-md-4">
							    <label for="country" class="form-label">Pais</label>
							    <select class="form-select" aria-label="Default select example" id="country" v-model="form.country" @change="onChangeCountry" required>
							      	<option v-for="country in countries" v-bind:value="country.id">
									    {{ country.name }}
									</option>
								</select>
							</div>

							<div class="col-md-6">
							    <label for="state" class="form-label">Estado/Condado</label>
							    <select class="form-select" aria-label="Default select example" id="state" v-model="form.state" @change="onChangeState" required>
								  	<option v-for="state in states" v-bind:value="state.id">
									    {{ state.name }}
									</option>
								</select>
							</div>
							<div class="col-md-6">
							    <label for="city" class="form-label">Ciudad</label>
							    <select class="form-select" aria-label="Default select example" id="city" v-model="form.city" required>
								  	<option v-for="city in cities" v-bind:value="city.id">
									    {{ city.name }}
									</option>
								</select>
							</div>

							<div class="col-12">
							    <label for="inputAddress" class="form-label">Address</label>
							    <input type="text" class="form-control" id="address" placeholder="1234 Main St" v-model="form.address" required>
							</div>
							<div class="col-md-8">
							    <label for="email" class="form-label">Email</label>
							    <input type="email" class="form-control" id="email" v-model="form.email" required>
							</div>
							<div class="col-md-4">
							    <label for="mobilePhone" class="form-label">Telefono</label>
							    <input type="tel" class="form-control" id="mobilePhone" v-model="form.mobilePhone" required>
							</div>

							<button  class="btn btn-primary" type="submit">Guardar</button>
						</form>
		      		</div>
		    	</div>
		  	</div>
		</div>
	`
})