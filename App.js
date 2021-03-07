import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button,} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame= ()=>{
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ]
    })
  }

  //Gelen veri 1 ise Oyuncu1 kazanmış oldu. -1 ise Player2 kazanmış oldu. 0 ise kazanan yok. 
  getWinner= () =>{
    const NUM_TILES= 3;
    var arr= this.state.gameState;
    var sum;

    //satırları kontrol etme
    for(var r = 0; r < NUM_TILES ;r++){
      sum=arr[r][0] + arr[r][1] + arr[r][2];
      if(sum == 3) { return 1; }
      else if (sum == -3) {return -1;}
    }

    //sutunları kontrol etme
    for(var c=0; c<NUM_TILES; c++){
      sum=arr[0][c] + arr[1][c] + arr[2][c];
      if(sum==3) {return 1;}
      if (sum==-3) {return -1;}
    }

    //Çapraz kontrol etme
    sum=arr[0][0] + arr[1][1] + arr[2][2];
    if(sum==3) {return 1;}
    if (sum==-3) {return -1;}

    sum=arr[0][2] + arr[1][1] + arr[2][0];
    if(sum==3) {return 1;}
    if (sum==-3) {return -1;}

    //Kazanan yok ise
    return 0;

  }

  onTilePress= (row, col)=> {
    //Aynı kutucuğa bidaha dokununca değişmesine izin verme
    var value= this.state.gameState[row][col];
    if(value !==0){ return;}

    //Gelen oyuncuyu al
    var currentPlayer= this.state.currentPlayer;

    //Seçilen Kutu
    var arr= this.state.gameState.slice();
    arr[row][col]= currentPlayer;
    this.setState({gameState:arr});

    //Oyuncu Değiştir
    var nextPlayer= (currentPlayer==1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //Kazananı Kontrol Etme
    var winner= this.getWinner();
    if(winner == 1){
      Alert.alert("OYUNCU-1 KAZANDI.");
      this.initializeGame();
    }
    else if(winner == -1){
      Alert.alert("OYUNCU-2 KAZANDI.");
      this.initializeGame();
    }
  }

  onNewGamePress= () =>{
    this.initializeGame();
  } 

  renderIcon= (row, col)=>{
    var value= this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />; 
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Text style={Text.Colors= styles.baslik}>Tic Tac Toe</Text>
        <View style= {{padding: 20}} />

        <Text style= {styles.oyuncu1}> Çarpı İşareti   :     Oyuncu-1 </Text>
        <View style= {{padding: 5}} />
        <Text style= {styles.oyuncu2}> Yuvarlak         :     Oyuncu-2 </Text>
        <View style= {{padding: 25}} />
  
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0,}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth: 0,}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0,}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth: 0,}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth: 0,}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth: 0,}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0,}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style= {{padding: 25}} />

        <Button title= "YENİ OYUN" onPress= {this.onNewGamePress} color='black' fontWeight='bold' backgroundColor='white' />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',w
    justifyContent: 'center',
  },

  baslik: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
  },

  oyuncu1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffe413',
  },

  oyuncu2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00cd66',
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },

  tileX: {
    color: "#ffe413",
    fontSize: 80,
    flex: 1,
  },

  tileO: {
    color: "#00cd66",
    fontSize: 80,
    flex: 1,
  }

});