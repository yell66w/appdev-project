<tr>

              <template v-for="(lab,i) in laboratory">
                <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="hh">
                </td>
              </template>



              <!-- <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="Quiz #1"
                  v-model="lab_quiz1">
              </td>
              <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="# Items"
                  v-model="lab_items">
              </td> -->
            </tr>
            <tr>

              <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none"
                  placeholder="# Present" v-model="lab_present">
              </td>
              <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="Quiz #2"
                  v-model="lab_quiz2">
              </td>
              <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="Score"
                  v-model="lab_score">
              </td>
            </tr>
            <tr>

              <td></td>
              <td><input type="number" min='0' max='100' class="border-0 form-control shadow-none" placeholder="Quiz #3"
                  v-model="lab_quiz3">
              </td>
              <td></td>
            </tr>
            <tr>

              <td><input disabled type="number" min='0' max='100' class="border-0 form-control shadow-none"
                  placeholder="Grade" v-model="lab_attendance_grade"></td>
              <td><input disabled type="number" min='0' max='100' class="border-0 form-control shadow-none"
                  placeholder="Grade" v-model="lab_machine_grade"></td>
              <td><input disabled type="number" min='0' max='100' class="border-0 form-control shadow-none"
                  placeholder="Grade" v-model="lab_exam_grade"></td>

            </tr>
