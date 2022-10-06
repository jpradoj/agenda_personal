Vue.component('mymenu',{
	data(){
		return{
			searchvalue:null
		}
  	},

	methods:{
		search(event){
			event.preventDefault();
			this.$emit("search",this.searchvalue);
			this.searchvalue="";
		},
		change(event){
			if(this.searchvalue.length == 0){
				this.$emit("reload",this.searchvalue);
			}
		}
	},
	template:`
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		  	<div class="container-fluid">
			    <a class="navbar-brand" href="#">Agenda Personal</a>
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse" id="navbarSupportedContent">
			      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
			        <li class="nav-item">
			          <!--<a class="nav-link" href="#">Agregar Contacto</a>-->
			          <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#formAdd">Agregar Contactos</button>
			        </li>
			      </ul>
			      <form class="d-flex" v-on:submit="search" >
			        <input class="form-control me-2" type="search" placeholder="Buscar contacto" aria-label="Search" v-model="searchvalue" @keyup="change" @change="change" >
			        <button class="btn btn-outline-success" type="submit">Buscar</button>
			      </form>
			    </div>
			</div>
		</nav>
	`
})