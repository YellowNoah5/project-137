status = ""
objects = []

function setup()
{
    canvas = createCanvas(500, 500)
    canvas.position(715,400)

    vid = createCapture(VIDEO)
    vid.hide()
}

function preload()
{
    

 
}

function start()
{
    modl = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("statuss").innerHTML = "Status: Detecting Object"
    inputxt = document.getElementById("inp").value
    console.log(inputxt)
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects = results

    }
}


function modelLoaded()
{
    console.log("Model Loaded!")
    status = true
}

function draw() 
{
    image(vid, 0, 0, 500, 500)

    if(status != "")
    {
        

        modl.detect(vid, gotResults)

        for(i = 0; i < objects.length; i++ )
        {
            percentage = floor(objects[i].confidence*100)

            fill("blue")

            textSize(20)
            
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y)

            noFill()

            stroke("blue")

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == inputxt)
            {
            
                vid.stop()

                modl.detect(gotResults);

                document.getElementById("objdet").innerHTML = inputxt + " found"
                document.getElementById("statuss").innerHTML = "Status: Object detected"

                synth = window.speechSynthesis
                utterthis = new SpeechSynthesisUtterance(inputxt +" found")

                synth.speak(utterthis)
                
            }
            else
            {
                document.getElementById("objdet").innerHTML = inputxt + " not found"
            }
            

            

        }

        
    }
}