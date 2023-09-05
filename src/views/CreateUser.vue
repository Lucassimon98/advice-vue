<template>
    
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Criação de Usuário</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" v-model="model.userAdvice.nome" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="model.userAdvice.email" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Senha</label>
                    <input type="text" v-model="model.userAdvice.senha" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Conselho</label>
                    <br>
                    <br>
                    <label for="">{{this.advice}}</label>
                    <br>
                    <br>
                    <button type="button" @click="getAdvice" class="btn btn-primary">Gere outro</button>
                </div>
                <div class="mt-5">
                    <button type="button" @click="saveUser" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </div>
    </div>    
  
</template>

<script>
import axios from 'axios'
export default {
    name: 'userAdviceCreate',
    data() {
        return {
            errorList: '',
            model: {
                userAdvice: {
                    nome: '',
                    email: '',
                    senha: '',
                    advice: '',
                }
            }
        }
    },
    mounted() {
        this.getAdvice();
    },
    methods: {

        getAdvice() {
            axios.get('https://api.adviceslip.com/advice').then(res => {
                this.advice = res.data.slip.advice;
                console.log(this.advice)
            });
        },

        saveUser() {
            var $this = this;
            axios.post('http://127.0.0.1:8000/api/advices', this.model.userAdvice).then(res => {
                // console.log(res)
                alert(res.data.message);

                this.model.userAdvice = {
                    nome: '',
                    email: '',
                    senha: '',
                    advice: '',
                }
                this.errorList = '';
            })
            .catch(function (error) {
                if (error.response) {
                    if(error. response.status == 422) {
                        $this.errorList = error.response.data.errors
                    }
                console.error(error.response.data);
                // console.error(error.response.status);
                // console.error(error.response.headers);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
            })
        }
    }
}
</script>