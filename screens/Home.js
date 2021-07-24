import React from 'react'
import { SafeAreaView, RefreshControl, Image, Pressable, Text, View, ScrollView } from 'react-native'

export default class Home extends React.Component {
    state = {
        data: [],
        isRefreshing: false
    }

    componentDidMount(){
        this.loadData()
    }
    render() {
        return(
        <SafeAreaView
        style = {{
            backgroundColor: 'white',
            flex: 1
        }}>
            <View
            style = {{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20
            }}>
                <Text
                style = {{
                    fontSize: 24,
                    fontWeight: 'bold'
                }}>
                    Food Order
                </Text>
                <Pressable>
                    <Image
                    resizeMode = 'contain'
                    source = {require('../images/order-history.png')}
                    style = {{
                        tintColor: 'dodgerblue',
                        height: 40,
                        width: 40
                    }}>

                    </Image>
                </Pressable>

            </View>

            <ScrollView
            contentContainerStyle = {{
                paddingHorizontal: 20,
                paddingTop: 20
            }}
            refreshControl = {
              <RefreshControl
                colors = {['black']}
                refreshing = {this.state.isRefreshing}
                onRefresh = {() =>{
                    this.refreshData()
                }}>

                </RefreshControl>
            }

            style = {{
                backgroundColor: 'rgb{235, 235, 235}',
                flex: 1
            }}>
                {
                    this.state.data.map(item => {
                        return(
                            <Pressable
                            style = {{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                flexDirection: 'row',
                                overflow: 'hidden'
                            }}>
                    <Image
                    source = {{uri: item.photo}}
                    style = {{
                        height: 100,
                        width: 100
                    }}>

                    </Image>
                    <View
                    style = {{
                        flex: 1,
                        justifyContent: 'center',
                        padding: 20
                    }}>
                    <Text
                    style = {{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        {item.name}
                    </Text>
                    <Text
                    style = {{
                        color: 'green',
                        fontWeight: 'bold',
                        marginTop: 5
                    }}>
                       Rp {item.price.toLocaleString('ID')}
                    </Text>
                    </View>
                    
                </Pressable>
                        )
                    })
                }
                
            </ScrollView>

        </SafeAreaView>
        )}

    async loadData(){
        const baseURL = 'https://neptune.crocodic.net/crocodic-training-api/public/api/v1'

        await fetch(baseURL + '/foods')
        .then(response => response.json())
        .then(responseJSON => {
            if (responseJSON.status == 200) {
                this.setState({data: responseJSON.data})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    async refreshData(){
        this.setState({
            data: [],
            isRefreshing: true
        })

        await this.loadData()

        this.setState({isRefreshing: false})
    }
}