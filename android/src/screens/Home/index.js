import React, { Component, useEffect, useState } from 'react';
import {
    View , 
    Text ,
    StyleSheet , 
    TextInput , 
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {
    constructor(){
        super();
        this.state =  {
            tambah : 0,
            kurang : 0,
            hasil: 0,
        }
    }
    async componentDidMount(){
        try{
            const total = await AsyncStorage.getItem('total');
            console.log('total', total);
            if(total){
                this.setState({
                    hasil: parseInt(total)
                })
            }
        }catch(e){
            console.log(e)
        }

    }
    
    handleButton = async(data) =>{
        const datas = await AsyncStorage.getItem('total');
        console.log('data =>',datas)
        const{hasil,tambah,kurang} = this.state;
       if(data==='tambah'){
        await this.setState({
            hasil: hasil + parseInt(tambah),
            tambah: 0
        });
        try{
            var rincian = await AsyncStorage.getItem('rincian');
            if(rincian===null){
                rincian = []
            }else{
                rincian = JSON.parse(rincian)
            }

            var datainput = {
                "tambah":tambah
            }
            rincian.push(datainput)
            await AsyncStorage.setItem('rincian',JSON.stringify(rincian));


        }catch(e){
            console.log(e);
        }
              
       }else if(data==='kurang'){
        await this.setState({
           hasil : hasil - kurang,
           kurang: 0
        });
        try{
            var rincian = await AsyncStorage.getItem('rincian');
            if(rincian===null){
                rincian = []
            }else{
                rincian = JSON.parse(rincian)
            }

            var datainput = {
                "kurang":kurang
            }
            rincian.push(datainput)
            await AsyncStorage.setItem('rincian',JSON.stringify(rincian));


        }catch(e){
            console.log(e);
        }
       }
    }
    async componentDidUpdate(){
        const{hasil} =  this.state;
       
         try{
           await  AsyncStorage.setItem('total',JSON.stringify(hasil))
        }catch(e){
            console.log(e)
        }
    }
    hanldeResult =async () => {
        const ri = await AsyncStorage.getItem('rincian');
       const rs = JSON.parse(ri);
       rs.map((data, key) => {
           console.log('data map',data.tambah?data.tambah:data.kurang)
       })
    }


    render(){
        const{hasil,tambah, kurang} = this.state;
        this.hanldeResult()
        
        return(
            <>
            <View style={styles.containerHeader}>
               <View style={styles.contanerText}>
                <Text style={styles.textClear}>clear</Text>
                <Text style={styles.textRincian}>rinccian</Text>
               </View>
            </View>
    
            <View style={styles.containerCardHasil}> 
                <Text>hasil : {hasil}</Text>
            </View>
            <View>
                <TextInput value={tambah} onChangeText={(text) => this.setState({tambah:text})} style={styles.textInput} placeholder="pemasukan"/>
                <TouchableOpacity onPress={() => this.handleButton('tambah')} style={styles.buttoPlus}>
                    <Text style={styles.textPlus}>Pemasukan</Text>
                </TouchableOpacity>
    
            </View>
    
            <View>
                <TextInput value={kurang} onChangeText={(text) => this.setState({kurang:text})} style={styles.textInput} placeholder="pemasukan"/>
                <TouchableOpacity onPress={() => this.handleButton('kurang') } style={styles.buttoPlus}>
                    <Text style={styles.textPlus}>Pengeluaran</Text>
                </TouchableOpacity>
    
            </View>
            
    
            </>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    containerHeader : {
        backgroundColor:'blue'

    },
    contanerText: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    textClear:{
        flex:1
    },
    textRincian:{
        // flex: 1
    },
    buttoPlus: {
        backgroundColor:'blue',
        width: 80,
        borderRadius: 8,
        height: 25
    },
    textPlus:{
        color:'white',
        textAlign:'center',
        marginTop: 3
    },
    textInput:{
        width:'50%',
        margin: 5,
        borderRadius: 5,
        padding: 6,
        borderWidth: 2,
    },
    containerCardHasil :{
        backgroundColor:'red',
        width: '100%',
        height: 300,
        margin: 3,
    }
    
});