Vue.component('paginate',{
	data(){
		return{
			star:0,
			limit:10,
			page:1,
		}
	},
	props:['totalPage'],
	methods:{
		onPrevius(event){
			event.preventDefault();
			if(this.page!=1)
				this.star-=10
				this.page--
			this.$emit("onReload",this.star, this.limit);
		},
		onNext(event){
			event.preventDefault();
			if(this.page!=this.totalPage)
				this.star+=10
				this.page++
			this.$emit("onReload",this.star, this.limit);
		},
		changePage(pagina){
			this.page=pagina;
			if(this.page==1){
				this.star=0;
			}else{
				this.star=((this.page*10)-10);
			}
			this.$emit("onReload",this.star, this.limit);
		}
	},
	mounted () {
		/*const path = window.location.origin+window.location.pathname
	    axios
	      	.get(path+'php/getTotalPage.php')
	      	.then(response => (this.totalPage = response['data'][0]['totalPage']))*/
	},
	template:`
		<nav aria-label="Paginador" id="paginador">
		  	<ul class="pagination">
		  		<div v-if="page==1">
			    	<li class="page-item disabled">
			      		<a class="page-link" href="#" aria-label="Previous" v-on:click="onPrevius">
			        		<span aria-hidden="true">&laquo;</span>
			      		</a>
			    	</li>
			    </div>
			    <div v-else>
			    	<li class="page-item">
			      		<a class="page-link" href="#" aria-label="Previous" v-on:click="onPrevius">
			        		<span aria-hidden="true">&laquo;</span>
			      		</a>
			    	</li>
			    </div>
			    <div v-for="i in totalPage">
			    	<div v-if="page == i">
				    	<li class="page-item active">
				    		<a class="page-link" v-on:click="changePage(i)">{{ i }}</a>
				    	</li>
				    </div>
				    <div v-else>
				    	<li class="page-item">
				    		<a class="page-link" v-on:click="changePage(i)">{{ i }}</a>
				    	</li>
				    </div>
			    </div>
		    	<div v-if="totalPage == page">
				    <li class="page-item disabled">
				      	<a class="page-link" href="#" aria-label="Next" v-on:click="onNext">
				        	<span aria-hidden="true">&raquo;</span>
				      	</a>
				    </li>
				</div>
				<div v-else>
					<li class="page-item">
				      	<a class="page-link" href="#" aria-label="Next" v-on:click="onNext">
				        	<span aria-hidden="true">&raquo;</span>
				      	</a>
				    </li>
				</div>
		  	</ul>
		</nav>
	`
})