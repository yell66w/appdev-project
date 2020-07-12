const EventBus = new Vue();
var gradeComponent = {
    props: ['lab', 'updateWho'],
    template: '<input min=0 max=100 style="width:100px; background-color:white" disabled placeholder="Grade"  class="border-0 form-control shadow-none" v-model="lab_grade">',
    computed: {
        lab_grade: function () {
            let invalid = false;

            if (this.lab.subcategory[0].score > 100 || this.lab.subcategory[1].score > 100 || this.lab.subcategory[0].score < 0 || this.lab.subcategory[1].score < 0)
                invalid = true;
            else {
                if (this.lab.type == 0) {

                    if (this.lab.subcategory[0].score == 0 || this.lab.subcategory[1].score == 0) {
                        EventBus.$emit(this.updateWho, {
                            grade: 0,
                            id: this.lab.id
                        })
                        return 0
                    }
                    else if (parseFloat(this.lab.subcategory[0].score) < parseFloat(this.lab.subcategory[1].score))
                        invalid = true;
                    else if (this.lab.subcategory[0].score && this.lab.subcategory[1].score) {
                        let grade = ((this.lab.subcategory[1].score / this.lab.subcategory[0].score) * 100);
                        EventBus.$emit(this.updateWho, {
                            grade: grade * this.lab.percentage,
                            id: this.lab.id
                        })
                        return grade.toFixed(2);
                    }
                    else
                        return ''


                }
                else if (this.lab.type == 1)
                    if (this.lab.subcategory[0].score && this.lab.subcategory[1].score) {
                        let grade = 0;
                        let gs = this.lab.subcategory;
                        let enter = true;
                        if (gs.length > 2) {
                            if (!this.lab.subcategory[2].score) {
                                this.lab.subcategory[2].score = 0;

                            }
                            if (this.lab.subcategory[2].score > 100 || this.lab.subcategory[2].score < 0) {
                                enter = false
                                invalid = true;
                                EventBus.$emit(this.updateWho, {
                                    grade: 0,
                                    id: this.lab.id
                                })
                                return 'Invalid'

                            }
                        }

                        if (enter) {
                            gs.forEach(g => {
                                grade += parseFloat(g.score);
                            })
                            grade = grade / gs.length;
                            EventBus.$emit(this.updateWho, {
                                grade: grade * this.lab.percentage,
                                id: this.lab.id
                            })
                            return grade.toFixed(2)

                        }
                        else {
                            return ''
                        }

                    }
                    else if (this.lab.subcategory[0].score) {
                        let gs = this.lab.subcategory;
                        grade = this.lab.subcategory[0].score / gs.length;
                        EventBus.$emit(this.updateWho, {
                            grade: grade * this.lab.percentage,
                            id: this.lab.id
                        })
                        return grade.toFixed(2)
                    }
                    else if (this.lab.subcategory[1].score) {
                        let gs = this.lab.subcategory;
                        grade = this.lab.subcategory[1].score / gs.length;
                        EventBus.$emit(this.updateWho, {
                            grade: grade * this.lab.percentage,
                            id: this.lab.id
                        })
                        return grade.toFixed(2)
                    }
                    else if (this.lab.subcategory.length > 2) {
                        if (this.lab.subcategory[2].score) {
                            let gs = this.lab.subcategory;
                            grade = this.lab.subcategory[2].score / gs.length;
                            EventBus.$emit(this.updateWho, {
                                grade: grade * this.lab.percentage,
                                id: this.lab.id
                            })
                            return grade.toFixed(2)
                        }
                    }
                    else
                        return ''

            }

            if (invalid) {
                EventBus.$emit(this.updateWho, {
                    grade: 0,
                    id: this.lab.id
                })
                return "Invalid"
            }
        }
    }
}
var lecLabComponent = {
    props: ['updateWho', 'percent', 'bus'],
    template: '<input disabled type="number" style="background-color: white;" class="form-control" placeholder="0" aria-describedby="laboratory" v-model="lab_overall">',
    data() {
        return {
            lab_overall: 0
        }
    },
    mounted() {
        let self = this
        let gr = [0, 0, 0, 0]
        EventBus.$on(this.updateWho, function (data) {
            gr[data.id] = data.grade
            self.lab_overall = 0;
            self.lab_overall = ((gr[0] + gr[1] + gr[2] + gr[3]) * self.percent).toFixed(2)

            if (self.updateWho == "updateLec") {
                self.$parent.lecture.grade = ((gr[0] + gr[1] + gr[2] + gr[3]) * self.percent).toFixed(2)
            }
            else if (self.updateWho == "updateLab") {
                self.$parent.laboratory.grade = ((gr[0] + gr[1] + gr[2] + gr[3]) * self.percent).toFixed(2)
            }

        });

    },
    created() {
        let self = this
        EventBus.$on('resetAll', function () {
            self.lab_overall = 0;
        })

    }
}
var lab = new Vue({
    el: '#app',
    components: {
        'grade-component': gradeComponent,
        'leclab-component': lecLabComponent
    },
    data: {
        bus: new Vue(),
        p_show: true,
        m_show: false,
        pf_show: false,
        f_show: false,
        s_show: false,
        prelims: 0,
        midterms: 0,
        prefinals: 0,
        finals: 0,
        laboratory_percentage: 0.40,
        lecture_percentage: 0.60,
        overall: 0,
        laboratory: [
            {
                id: 0,
                name: 'Attendance',
                type: 0,
                grade: 0,
                percentage: 0.10,
                subcategory: [
                    {
                        name: '# Session',
                        score: null,

                    },
                    {
                        name: "# Present",
                        score: null
                    }
                ]

            },
            {
                id: 1,
                name: 'Machine Problem',
                grade: 0,
                type: 1,
                percentage: 0.40,
                subcategory: [
                    {
                        name: 'Q1',
                        score: null
                    },
                    {
                        name: 'Q2',
                        score: null
                    }
                ]
            },
            {
                id: 2,
                name: 'Major Exam',
                type: 0,
                grade: 0,
                percentage: 0.50,
                subcategory: [
                    {
                        name: '# Items',
                        score: null
                    },
                    {
                        name: "Score",
                        score: null
                    }
                ]

            },
        ],
        lecture: [
            {
                id: 0,
                name: 'Attendance',
                type: 0,
                grade: 0,
                percentage: 0.10,
                subcategory: [
                    {
                        name: '# Session',
                        score: null,

                    },
                    {
                        name: "# Present",
                        score: null
                    }
                ]

            },
            {
                id: 1,
                name: 'Quiz',
                grade: 0,
                type: 1,
                percentage: 0.30,
                subcategory: [
                    {
                        name: 'Q1',
                        score: null
                    },
                    {
                        name: 'Q2',
                        score: null
                    }
                ]
            },
            {
                id: 2,
                name: 'Independent Learning',
                grade: 0,
                type: 1,
                percentage: 0.10,
                subcategory: [
                    {
                        name: 'Recitation',
                        score: null
                    },
                    {
                        name: 'Project',
                        score: null
                    },
                    {
                        name: 'Assignment',
                        score: null
                    }
                ]
            },
            {
                id: 3,
                name: 'Major Exam',
                type: 0,
                grade: 0,
                percentage: 0.50,
                subcategory: [
                    {
                        name: '# Items',
                        score: null
                    },
                    {
                        name: "Score",
                        score: null
                    }
                ]

            },
        ],
    },
    methods: {
        save: function (i) {
            if (i == 1) {
                if (this.lecture.grade && this.laboratory.grade) {
                    this.prelims = parseFloat(this.lecture.grade) + parseFloat(this.laboratory.grade)
                }
                else if (this.lecture.grade) {
                    this.prelims = parseFloat(this.lecture.grade)
                }
                else if (this.laboratory.grade) {
                    this.prelims = parseFloat(this.laboratory.grade)
                }
                console.log(this.lecture[0].subcategory[0].score)
                this.lecture.forEach(lec => {
                    lec.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.laboratory.forEach(lab => {
                    lab.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.overall = (this.prelims * 0.20) + (this.midterms * 0.20) + (this.prefinals * 0.20) + (this.finals * 0.40)
                this.p_show = false;
                this.m_show = true;
                this.lecture.grade = 0;
                this.laboratory.grade = 0;

                EventBus.$emit('resetAll');

                window.scrollTo(0, 0);
            }
            else if (i == 2) {
                if (this.lecture.grade && this.laboratory.grade) {
                    this.midterms = parseFloat(this.lecture.grade) + parseFloat(this.laboratory.grade)
                }
                else if (this.lecture.grade) {
                    this.midterms = parseFloat(this.lecture.grade)
                }
                else if (this.laboratory.grade) {
                    this.midterms = parseFloat(this.laboratory.grade)
                }
                this.overall = (this.prelims * 0.20) + (this.midterms * 0.20) + (this.prefinals * 0.20) + (this.finals * 0.40)
                this.m_show = false;
                this.pf_show = true;
                this.lecture.forEach(lec => {
                    lec.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.laboratory.forEach(lab => {
                    lab.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.lecture.grade = 0;
                this.laboratory.grade = 0;
                EventBus.$emit('resetAll');
                window.scrollTo(0, 0);
            }
            else if (i == 3) {
                if (this.lecture.grade && this.laboratory.grade) {
                    this.prefinals = parseFloat(this.lecture.grade) + parseFloat(this.laboratory.grade)
                }
                else if (this.lecture.grade) {
                    this.prefinals = parseFloat(this.lecture.grade)
                }
                else if (this.laboratory.grade) {
                    this.prefinals = parseFloat(this.laboratory.grade)
                }
                this.overall = (this.prelims * 0.20) + (this.midterms * 0.20) + (this.prefinals * 0.20) + (this.finals * 0.40)
                this.pf_show = false;
                this.f_show = true;
                this.lecture.forEach(lec => {
                    lec.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.laboratory.forEach(lab => {
                    lab.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.lecture.grade = 0;
                this.laboratory.grade = 0;
                EventBus.$emit('resetAll');
                window.scrollTo(0, 0);
            }
            else if (i == 4) {
                if (this.lecture.grade && this.laboratory.grade) {
                    this.finals = parseFloat(this.lecture.grade) + parseFloat(this.laboratory.grade)
                }
                else if (this.lecture.grade) {
                    this.finals = parseFloat(this.lecture.grade)
                }
                else if (this.laboratory.grade) {
                    this.finals = parseFloat(this.laboratory.grade)
                }
                this.overall = (this.prelims * 0.20) + (this.midterms * 0.20) + (this.prefinals * 0.20) + (this.finals * 0.40)
                this.f_show = false;
                this.s_show = true;
                this.lecture.forEach(lec => {
                    lec.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.laboratory.forEach(lab => {
                    lab.subcategory.forEach(sub => {
                        sub.score = null;
                    })
                })
                this.lecture.grade = 0;
                this.laboratory.grade = 0;
                EventBus.$emit('resetAll');
                window.scrollTo(0, 0);
            }

        }

    }
})

