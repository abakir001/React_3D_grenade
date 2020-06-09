import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

class App extends Component {
  componentDidMount() {

    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0000ff );
    // Create a basic perspective camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    camera.position.x = 0;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);
    //camera.position.y = 15;
    
    //var light = new THREE.PointLight( 0xff0000, 1, 100 );
    var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set(1,2,1)
    scene.add( light )
    // Create a renderer with Antialiasing
    var renderer = new THREE.WebGLRenderer({antialias:true});
    
    // Configure renderer clear color
    renderer.setClearColor("#000000");
    
    // Configure renderer size
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // Append Renderer to DOM
    document.body.appendChild( renderer.domElement );
    
    var grenade = new THREE.Group();
    
    var geometrysph = new THREE.SphereGeometry( 6, 50, 50 );
    var materialsph = new THREE.MeshPhongMaterial({
    
            color: 0xffff00,
            specular: 0x333333,
            shininess: 25
          });
    
    var x = camera.position.x;
    var z = camera.position.z;
    
    var box_geom = new THREE.BoxGeometry( 12, 6, 6 );
    var box = new THREE.Mesh( box_geom, materialsph );
    
    grenade.add(box); 
    
    box.position.set(0, 15, 0);
    
    var render = function () {
      renderer.render(scene, camera);
    };     
    
    var radius1 = 5;
    var alpha = 0;
    for ( var i =0; i < 8; i++) {
      alpha = alpha + i * Math.PI/4;
      var sphere = new THREE.Mesh( geometrysph, materialsph );
        sphere.position.x = radius1 * Math.cos(alpha);
        sphere.position.y = 2 * radius1 * Math.sin(alpha);
        
    grenade.add( sphere );
    }  
                              
    alpha = 0;
    for ( var i =0; i < 8; i++) {
      alpha = alpha + i * Math.PI/4;
      var sphere = new THREE.Mesh( geometrysph, materialsph );
        sphere.position.z = radius1 * Math.cos(alpha);
        sphere.position.y = 2 * radius1 * Math.sin(alpha);
        
    grenade.add( sphere );
    }                           
    alpha = 0;
    for ( var i =0; i < 8; i++) {
      alpha = alpha + i * Math.PI/4;
      var sphere = new THREE.Mesh( geometrysph, materialsph );
        sphere.position.x = radius1 * Math.cos(alpha);
        sphere.position.z = radius1 * Math.sin(alpha);
        
    grenade.add( sphere ); 
    }            
    
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }       
    
    const path = new CustomSinCurve(8);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    const geometry = new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed);
    
    //var geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
    //var material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var tube = new THREE.Mesh( geometry, materialsph );
    tube.rotation.z = - Math.PI/10;
    tube.position.x = 10;
    tube.position.y = 6;
    grenade.add(tube);
     
    const radiusTop = 0.3;
    const radiusBottom = 0.3;
    const height = 0.5;
    const radialSegment = 6;
    const geometry2 = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegment);
    
    var materialC = new THREE.MeshPhongMaterial({
      color: 0xfff00f,
      specular: 0x333333,
      shininess: 25
    });
    var cyl = new THREE.Mesh(geometry2, materialC); 
    cyl.rotation.x = Math.PI/2;
    
    cyl.position.x = 5.3; 
    cyl.position.y = 17.; 
    cyl.position.z = 3.; 
    grenade.add(cyl);
    var cyl2 = new THREE.Mesh(geometry2, materialC); 
    cyl2.position.x = 5.3; 
    cyl2.position.y = 13.; 
    cyl2.position.z = 3.; 
    grenade.add(cyl2);
    var cyl3 = new THREE.Mesh(geometry2, materialC); 
    cyl3.position.x = - 5.3; 
    cyl3.position.y = 13.; 
    cyl3.position.z = 3.; 
    grenade.add(cyl3);
    var cyl4 = new THREE.Mesh(geometry2, materialC); 
    cyl4.position.x = - 5.3; 
    cyl4.position.y = 17.; 
    cyl4.position.z = 3.; 
    grenade.add(cyl4);
    
    
    var cyl = new THREE.Mesh(geometry2, materialC); 
    cyl.rotation.x = - Math.PI/2;
    
    cyl.position.x = 5.3; 
    cyl.position.y = 17.; 
    cyl.position.z = - 3.; 
    grenade.add(cyl);
    var cyl2 = new THREE.Mesh(geometry2, materialC); 
    cyl2.position.x = 5.3; 
    cyl2.position.y = 13.; 
    cyl2.position.z = - 3.; 
    grenade.add(cyl2);
    var cyl3 = new THREE.Mesh(geometry2, materialC); 
    cyl3.position.x = - 5.3; 
    cyl3.position.y = 13.; 
    cyl3.position.z = - 3.; 
    grenade.add(cyl3);
    var cyl4 = new THREE.Mesh(geometry2, materialC); 
    cyl4.position.x = - 5.3; 
    cyl4.position.y = 17.; 
    cyl4.position.z = - 3.; 
    grenade.add(cyl4);
    
    scene.add(grenade);
    render();
     var animate = function () {
      requestAnimationFrame( animate );
    
      grenade.rotation.y += 0.002;
    
      renderer.render( scene, camera );
    };

    animate();   
  }

  render() {
      return (
        <div />
      )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
  
export default App;
