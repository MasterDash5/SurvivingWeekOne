console.log('back end achieved')

const Character={
    name:'',
    gpa:4.0,
    burnout:0,
    social:100
}

function returnChar()
{
    return Character
}

function setCharacter(change)
{
    Character=change
}

function getChoices()
{
    return
}

function updateStats()
{

    let choices=getChoices()

    Character.gpa=Character.gpa+choices.gpa
    Character.burnout=choices.burnout+Character.burnout
    Character.social=Character.social+choices.social
}

