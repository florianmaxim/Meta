var synth = new Tone.Synth().toMaster();

new Cube({w:5,h:1,l:1})
    .m('l',5)
    .m('u',5)
    .r('r',.5).r('f',.5)
    .c(0xffffff)
    .l((_,t)=> _.r('l', .01))
    .o('enter',(_)=> {
      _.c()
      synth.triggerAttackRelease("C4", "8n");
    })

new Cube({w:5,h:1,l:1})
    .m('r',0)
    .m('u',5)
    .r('r',.5).r('f',.5)
    .c(0xffffff)
    .l((_,t)=> _.r('u', .01))
    .o('release',(_)=>{
      _.c()
      synth.triggerAttackRelease("D4", "8n");
    })

new Cube({w:5,h:1,l:1})
    .m('r',5)
    .m('u',5)
    .r('r',.5).r('f',.5)
    .c(0xffffff)
    .l((_,t)=> _.r('b', .01))
    .o('touch',(_)=>{
      _.c()
      synth.triggerAttackRelease("F4", "8n");
    }) */