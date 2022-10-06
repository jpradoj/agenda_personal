Vue.component('app',{
	data(){
		return{
			contacts:null,
			totalPage:1
		}
	},
	methods:{
		onReload(start=0,limit=10){
			const path = window.location.origin+window.location.pathname
		    axios
		      	.get(path+'php/listContacts.php',{
		      		params:{
			      		start:start,
			      		limit:limit
			      	}
		      	})
		      	.then(response => (this.contacts = response['data']))

		    axios
		      	.get(path+'php/getTotalPage.php')
		      	.then(response => (this.totalPage = response['data'][0]['totalPage']))
		},
		onSearch(value){
			const path = window.location.origin+window.location.pathname
			if(value.length>0){
			    axios
			      	.get(path+'php/searchContacts.php',{
				      	params:{
				      		search:value
				      	}
			      	})
			      	.then(response => (this.contacts = response['data']))
			}else{
			    this.onReload();
			}
		},

	},
	mounted () {
		const path = window.location.origin+window.location.pathname
	    axios
	      	.get(path+'php/listContacts.php',{
	      		params:{
		      		start:0,
		      		limit:10
		      	}
	      	})
	      	.then(response => (this.contacts = response['data']))

	    axios
	      	.get(path+'php/getTotalPage.php')
	      	.then(response => (this.totalPage = response['data'][0]['totalPage']))
	},

	template:`
		<div>
			<mymenu ref="mymenu" name="mymenu" v-on:search="onSearch" v-on:reload="onReload"></mymenu>
			<div>
				<div class="container" id="cuerpo">
				  	<paginate ref="paginate" v-on:onReload="onReload" :totalPage="totalPage"></paginate>
				  	<table class="table table-striped">
					  	<thead>
					    	<tr>
						     	<th scope="col">Nombre</th>
						     	<th scope="col">Apellido</th>
						     	<th scope="col">Pais</th>
						     	<th scope="col">Estado/Condado</th>
						      	<th scope="col">Ciudad</th>
						      	<th scope="col">Telefono</th>
						      	<th scope="col">Email</th>
					    	</tr>
					  	</thead>
					  	<tbody>
					  		<tr v-for="(contact,index) in contacts">
					  			<td>{{ contact.firstName }}</td>
						  		<td>{{ contact.lastName }}</td>
						  		<td>{{ contact.Country }}</td>
						  		<td>{{ contact.State }}</td>
						  		<td>{{ contact.City }}</td>
						  		<td>{{ contact.MobilePhone }}</td>
						  		<td>{{ contact.Email }}</td>
					  		</tr>
					  	</tbody>
					</table>
				</div>
				<addcontact ref="add" v-on:recargar="onReload"></addcontact>
			</div>
			<myfooter></myfooter>
		</div>
	`
})


new Vue({
	el:'#app',
})