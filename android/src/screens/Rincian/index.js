import React, { Component } from 'react';
import {
    Text, View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Rincian extends Component {
    constructor(){
        super();
        this.state ={
            dataResult : []
        }
    }

    hanldeResult =async () => {
       const ri = await AsyncStorage.getItem('rincian');
       if(ri){
        const res = JSON.parse(ri);
        this.setState({
            dataResult: res
        })
       }else{
        this.setState({
            dataResult: []
        })
       }

    }

    componentDidMount(){
        this.hanldeResult()
    }

    render(){
        this.hanldeResult()
        const { dataResult } = this.state;
        return(
            <>
            <View>
                <View style={{marginHorizontal:10,marginVertical:10}}>
                    <Text>Rincian</Text>
                </View>

                <View>
                    {
                        dataResult.map((data , key) => {
                            return(
                                <View key={key}>
                                <View style={{marginHorizontal:10}}>
                                {
                                    data.tambah?
                                    <Text style={{color:'green',fontSize:17}}>Pemasukan = Rp. {data.tambah}</Text>:
                                    <Text style={{color:'red',fontSize:17}}>Pengeluaran = Rp. {data.kurang}</Text>
                                }
                                </View>
                                </View>
                            )
                        })
                    }
                </View>

            </View>
            
            </>
        )
    }
}
export default Rincian;