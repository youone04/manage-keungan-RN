import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";


class Rincian extends Component {
    constructor(){
        super();
        this.state ={
            dataResult : [],
            uri:''
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
        this.hanldeResult();

        
    }
   

    onDownload = async () => {
        this.refs.viewShot.capture()
        .then(uri => {
            CameraRoll.save(uri, 'photo')
            .then((resp) => alert(resp))
            .catch(err => console.log('err:', err))
          });
  
    }

    render(){
        this.hanldeResult()
        const { dataResult } = this.state;
        return(
            <>
            <View>
                <View style={{marginHorizontal:10,marginVertical:10}}>
                    <Text>Rincian</Text>
                   <TouchableOpacity>
                   <Text onPress={() => this.onDownload()}>download</Text>
                   </TouchableOpacity>
                </View>

                <ViewShot style={{backgroundColor:'white',height:824,width:824}} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <View style={{marginTop: 20,marginHorizontal: 20}}>
                    {
                        dataResult.length>0?
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
                        }):
                        <View>
                            <Text>Beum ada list rincian</Text>
                        </View>
                    }
                </View>
                </ViewShot>

            </View>
            
            </>
        )
    }
}
export default Rincian;