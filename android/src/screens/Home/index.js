import React, { useState } from 'react';
import {
    View , 
    Text ,
    StyleSheet , 
    TextInput , 
    TouchableOpacity
} from 'react-native';

const Home = ()=> {
    const [tambah , setTambah] = useState(0);
    const [kurang , setKurang] = useState(0);
    const [hasil ,setHasil] = useState(0);

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
            <TextInput onChangeText={(text) => setTambah(text)} style={styles.textInput} placeholder="pemasukan"/>
            <TouchableOpacity onPress={() =>  setHasil(hasil + parseInt(tambah))} style={styles.buttoPlus}>
                <Text style={styles.textPlus}>Pemasukan</Text>
            </TouchableOpacity>

        </View>

        <View>
            <TextInput onChangeText={(text) => setKurang(text)} style={styles.textInput} placeholder="pemasukan"/>
            <TouchableOpacity onPress={() =>  setHasil(hasil - kurang )} style={styles.buttoPlus}>
                <Text style={styles.textPlus}>Pengeluaran</Text>
            </TouchableOpacity>

        </View>
        

        </>
    )
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