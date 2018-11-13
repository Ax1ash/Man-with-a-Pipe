
// texture for the particle
var particle_texture = null;

// variable holding our particle system
var ps = null;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image
var back,apple,faceapple,man,noface,pipe;
var count;
var move;
var appCount;
var smoke;
function preload() {
    particle_texture = loadImage("particle_texture.png");
    
    back=loadImage("back.png");
    apple=loadImage("apple.png");
    faceapple=loadImage("faceapple.png");
    man=loadImage("man.png");
    pipe=loadImage("pipe.png");
    noface=loadImage("noface.png");
}

function setup() {
  count=0;
  move=0;
  appCount=0;
  smoke=0;
    //set the canvas size
    createCanvas(900,900);

    //initialize our particle system
    ps = new ParticleSystem(0,createVector(width / 2, height - 60),particle_texture);
}

function draw() {
    if(count==0){
          image(back,0,0);
          image(man,0,0);
          image(apple,0,0);

    }
    else if(count==1){
      if(appCount==0 ){
      move=move+20;
      appCount++;
      }
      else if(appCount==1 ){
      move=move-20;
      appCount++;

      }
      else if(appCount==2 ){
      move=0;
      appCount++;
      }
          image(back,0,0);
          image(man,0,0);
          image(apple,move,0);
    }
        else if(count==2){
      if(appCount==3 ){
      move=move+20;
      appCount++;
      }
      else if(appCount==4 ){
      move=move-20;
      appCount++;

      }
      else if(appCount==5 ){
      move=0;
      appCount++;
      }
          image(back,0,0);
          image(man,0,0);
          image(apple,move,0);
    }
    else if(count==3){
              image(back,0,0);
          image(man,0,0);
          image(faceapple,0,0);
    }
        else if(count==4){
              image(back,0,0);
          image(noface,0,0);
          image(faceapple,mouseX-450,mouseY-450);
    }
            else if(count==5){
              image(back,0,0);
          image(man,0,0);
          image(pipe,mouseX-380,mouseY-500);
    }
    
    else if(count>=6 && mouseX>400 && mouseX<500 && mouseY>400 &&
            mouseY<500){
            smoke=1;
            }
    else if(smoke==1){
    image(back,0,0);
    image(man,0,0);
    image(pipe,0,0); 

    var dx = map(mouseX,0,width,-0.2,0.2);
    var wind = createVector(dx,0);

    ps.applyForce(wind);
    ps.run();
    for (var i = 0; i < 2; i++) {
        ps.addParticle();
       }
            }
    
    else{              image(back,0,0);
          image(man,0,0);
          image(pipe,mouseX-380,mouseY-500);}

  
}

function mouseClicked(){
count=count+1;
}
//========= PARTICLE SYSTEM ===========

/**
 * A basic particle system class
 * @param num the number of particles
 * @param v the origin of the particle system
 * @param img_ a texture for each particle in the system
 * @constructor
 */
var ParticleSystem = function(num,v,img_) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
    this.img = img_
    for(var i = 0; i < num; ++i){
        this.particles.push(new Particle(this.origin,this.img));
    }
};

/**
 * This function runs the entire particle system.
 */
ParticleSystem.prototype.run = function() {

    // cache length of the array we're going to loop into a variable
    // You may see <variable>.length in a for loop, from time to time but
    // we cache it here because otherwise the length is re-calculated for each iteration of a loop
    var len = this.particles.length;

    //loop through and run particles
    for (var i = len - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.run();

        // if the particle is dead, we remove it.
        // javascript arrays don't have a "remove" function but "splice" works just as well.
        // we feed it an index to start at, then how many numbers from that point to remove.
        if (particle.isDead()) {
            this.particles.splice(i,1);
        }
    }
}

/**
 * Method to add a force vector to all particles currently in the system
 * @param dir a p5.Vector describing the direction of the force.
 */
ParticleSystem.prototype.applyForce = function(dir) {
    var len = this.particles.length;
    for(var i = 0; i < len; ++i){
        this.particles[i].applyForce(dir);
    }
}

/**
 * Adds a new particle to the system at the origin of the system and with
 * the originally set texture.
 */
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin,this.img));
}

//========= PARTICLE  ===========
/**
 *  A simple Particle class, renders the particle as an image
 */
var Particle = function (pos, img_) {
    this.loc = pos.copy();

    var vx = randomGaussian() * 0.3;
    var vy = randomGaussian() * 0.3 - 1.0;

    this.vel = createVector(vx,vy);
    this.acc = createVector();
    this.lifespan = 100.0;
    this.texture = img_;
}

/**
 *  Simulataneously updates and displays a particle.
 */
Particle.prototype.run = function() {
    this.update();
    this.render();
}

/**
 *  A function to display a particle
 */
Particle.prototype.render = function() {
    
    tint(255,this.lifespan);
    image(this.texture,this.loc.x-150,this.loc.y-410);
}

/**
 *  A method to apply a force vector to a particle.
 */
Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

/**
 *  This method checks to see if the particle has reached the end of it's lifespan,
 *  if it has, return true, otherwise return false.
 */
Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}

/**
 *  This method updates the position of the particle.
 */
Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
}
