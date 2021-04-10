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
            hasil: 0
        }
    }
    async componentDidMount(){
        // AsyncStorage.clear()
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
              
       }else if(data==='kurang'){
        await this.setState({
           hasil : hasil - kurang,
           kurang: 0
        });
       }
    }
    async componentDidUpdate(){
        const{hasil} =  this.state;
        console.log('hasil =>',hasil);
         try{
           await  AsyncStorage.setItem('total',JSON.stringify(hasil))
        }catch(e){
            console.log(e)
        }
    }

    render(){
        const{hasil,tambah, kurang} = this.state;
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