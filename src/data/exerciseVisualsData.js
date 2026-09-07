// Comprehensive Exercise Visual Guides, Video Masterclasses, Step-by-Step Biomechanics & Real Human Reanimation Frames

import pushupStart from "../assets/exercises/pushup_start.jpg";
import pushupEnd from "../assets/exercises/pushup_end.jpg";
import squatStart from "../assets/exercises/squat_start.jpg";
import squatEnd from "../assets/exercises/squat_end.jpg";
import curlStart from "../assets/exercises/curl_start.jpg";
import curlEnd from "../assets/exercises/curl_end.jpg";
import shoulderStart from "../assets/exercises/shoulder_start.jpg";
import shoulderEnd from "../assets/exercises/shoulder_end.jpg";

import dbPressImg from "../assets/exercises/db_press.jpg";
import bentRowImg from "../assets/exercises/bent_row.jpg";
import singleRowImg from "../assets/exercises/single_row.jpg";
import bulgarianSplitImg from "../assets/exercises/bulgarian_split.jpg";
import rdlImg from "../assets/exercises/rdl.jpg";

export const EXERCISE_VISUAL_GUIDES = {
  ex_pushups_std: {
    id: "ex_pushups_std",
    name: "Standard Floor Push-Ups",
    category: "Chest & Upper Body Push",
    primaryMuscles: ["Pectoralis Major (Chest)", "Anterior Deltoid (Front Shoulders)"],
    secondaryMuscles: ["Triceps Brachii", "Core & Serratus Anterior"],
    tempo: "2-0-1 (2s down, 0s pause, 1s explosive push)",
    breathing: "Inhale slowly while descending to 1 inch off floor, exhale forcefully on push-up.",
    setup: "High plank position, hands slightly wider than shoulder-width, fingers pointing slightly outwards.",
    bestViewAngle: "3/4 Lateral Side View (Best for checking 45° elbow angle & straight spine)",
    youtubeVideoId: "IODxDxX7oi4", // Calisthenicmovement Perfect Push Up Form
    humanImage: pushupEnd,
    motionFrames: {
      start: pushupStart,
      end: pushupEnd,
      startLabel: "High Plank Lockout (Start)",
      endLabel: "Chest 1-Inch Floor Hover (Bottom)",
    },
    checkpoints: [
      { label: "Elbow Angle", value: "45° Arrow Shape", status: "optimal" },
      { label: "Spine Alignment", value: "180° Laser Neutral", status: "optimal" },
      { label: "Chest Clearance", value: "1 Inch Off Floor", status: "optimal" },
      { label: "Hand Placement", value: "Shoulder Width", status: "optimal" },
    ],
    steps: [
      "1. High Plank Setup: Place hands on floor slightly wider than shoulder-width, fingers spread for stability.",
      "2. Core & Glute Lock: Squeeze glutes and brace core so your body forms a straight line from heels to crown.",
      "3. 45° Elbow Descent: Lower chest until 1 inch above the floor, keeping elbows tucked at roughly 45° (arrow shape, not T-shape).",
      "4. Explosive Press: Push into the floor through your whole palm, squeezing the chest hard at the top without locking out harshly."
    ],
    commonMistakes: [
      "Flaring elbows out to 90 degrees (strains the shoulder rotator cuff).",
      "Sagging hips or piking buttocks into the air (destroys core engagement).",
      "Short half-reps without touching chest close to the floor."
    ],
    proTip: "Imagine pushing the floor away from you rather than pushing yourself up. Squeeze your shoulder blades back as you descend.",
    svgType: "pushup_std"
  },

  ex1: {
    id: "ex1",
    name: "Dumbbell Floor Press / Bench Press",
    category: "Chest Mass & Triceps",
    primaryMuscles: ["Pectoralis Major (Mid & Lower Pecs)", "Triceps Brachii"],
    secondaryMuscles: ["Front Deltoids", "Forearms"],
    tempo: "3-1-1 (3s controlled lowering, 1s floor pause, 1s drive)",
    breathing: "Inhale on the way down, hold brace on floor touch, exhale on press.",
    setup: "Lie flat on floor or bench with knees bent and feet planted flat for lumbar support.",
    bestViewAngle: "Side 3/4 Elevated View (Best for verifying vertical forearm drive & wrist stack)",
    youtubeVideoId: "uUGbZUtU298", // Dumbbell Floor Press Guide
    humanImage: dbPressImg,
    motionFrames: {
      start: dbPressImg,
      end: dbPressImg,
      startLabel: "Dumbbells Pressed Over Chest",
      endLabel: "Elbows Touch Floor at 45-60°",
    },
    checkpoints: [
      { label: "Elbow Flare", value: "45-60° Safe Angle", status: "optimal" },
      { label: "Forearm Path", value: "100% Vertical Stack", status: "optimal" },
      { label: "Scapula Retraction", value: "Pinched Tight", status: "optimal" },
      { label: "Peak Lock", value: "Over Center Sternum", status: "optimal" },
    ],
    steps: [
      "1. Starting Position: Lie flat, hold dumbbells directly over upper chest with arms extended and palms facing forward.",
      "2. Scapula Retraction: Pinch shoulder blades together into the floor/bench to protect shoulders.",
      "3. Controlled Lowering: Lower dumbbells until triceps gently touch the floor (or chest height on bench) with elbows at 45-60°.",
      "4. Upward Arc: Drive weights upward, bringing dumbbells together above center chest while maintaining peak chest contraction."
    ],
    commonMistakes: [
      "Bouncing elbows hard off the floor (touch lightly to protect joints).",
      "Allowing wrists to bend backward under heavy dumbbell plates."
    ],
    proTip: "Floor pressing naturally prevents shoulder hyperextension, making it extremely safe for gaining chest mass at home!",
    svgType: "db_press"
  },

  ex2: {
    id: "ex2",
    name: "Standing Dumbbell Overhead Shoulder Press",
    category: "Shoulders (Deltoid Mass)",
    primaryMuscles: ["Anterior & Lateral Deltoids (Shoulders)"],
    secondaryMuscles: ["Triceps", "Upper Trapezius", "Core Stabilizers"],
    tempo: "2-1-1 (2s down to ear level, 1s pause, 1s overhead drive)",
    breathing: "Inhale at shoulder level, exhale as you press dumbbells straight overhead.",
    setup: "Feet shoulder-width apart, knees soft, dumbbells held at ear level with 90° elbow bend.",
    bestViewAngle: "Front 3/4 Studio View (Best for monitoring symmetrical deltoid press & ribcage lock)",
    youtubeVideoId: "qEwKCR5JCog", // Overhead Shoulder Press Technique
    humanImage: shoulderEnd,
    motionFrames: {
      start: shoulderStart,
      end: shoulderEnd,
      startLabel: "Dumbbells at Ear Level (Start)",
      endLabel: "Full Overhead Lockout (Peak)",
    },
    checkpoints: [
      { label: "Overhead Lockout", value: "Directly Above Ears", status: "optimal" },
      { label: "Ribcage Alignment", value: "Locked (Zero Arch)", status: "optimal" },
      { label: "Bottom Range", value: "Dumbbells at Ear Level", status: "optimal" },
      { label: "Knuckle Direction", value: "Facing Ceiling", status: "optimal" },
    ],
    steps: [
      "1. Rack Position: Hold dumbbells at ear level, palms facing forward or slightly turned inward (semi-neutral).",
      "2. Core Tightening: Lock ribcage down and squeeze glutes so you don't hyperextend your lower back.",
      "3. Vertical Drive: Press weights overhead until arms are nearly straight directly over your shoulders and ears.",
      "4. Smooth Return: Lower weights slowly under control back to ear level."
    ],
    commonMistakes: [
      "Arching lower spine backwards to compensate for heavy weight.",
      "Dropping dumbbells too low below chin level, losing deltoid tension."
    ],
    proTip: "Keep your knuckles facing the ceiling and squeeze your shoulder caps at the top.",
    svgType: "shoulder_press"
  },

  ex_pushups_diamond: {
    id: "ex_pushups_diamond",
    name: "Diamond / Close-Grip Push-Ups",
    category: "Inner Chest & Triceps Hypertrophy",
    primaryMuscles: ["Triceps Brachii (All 3 Heads)", "Inner Pectorals"],
    secondaryMuscles: ["Anterior Deltoids", "Core"],
    tempo: "2-1-1 (2s controlled descent, 1s pause, 1s extension)",
    breathing: "Inhale while lowering chest to hands, exhale while pushing up.",
    setup: "Place hands together directly beneath chest with index fingers and thumbs forming a diamond/triangle.",
    bestViewAngle: "Top-Down 3/4 View (Best for checking close diamond hand placement under sternum)",
    youtubeVideoId: "J0DnG1_S92I", // Diamond Pushups Guide
    humanImage: pushupEnd,
    motionFrames: {
      start: pushupStart,
      end: pushupEnd,
      startLabel: "Close Plank Lockout",
      endLabel: "Chest Touching Diamond Hands",
    },
    checkpoints: [
      { label: "Hand Spacing", value: "Diamond Under Sternum", status: "optimal" },
      { label: "Elbow Position", value: "Brushed Close to Ribs", status: "optimal" },
      { label: "Tricep Tension", value: "100% Horseshoe Load", status: "optimal" },
    ],
    steps: [
      "1. Diamond Base: Form a diamond shape with thumbs and index fingers directly below the center of your chest.",
      "2. Tight Plank: Keep body in a straight plank, feet slightly wider for improved balance.",
      "3. Close Elbow Descent: Lower chest towards the diamond, keeping elbows brushed close against ribcage.",
      "4. Triceps Extension: Push powerfully through palms until arms are straight, focusing on squeezing the horseshoes of your triceps."
    ],
    commonMistakes: [
      "Flaring elbows outward, which transfers load away from triceps to wrist joints.",
      "Placing hands too far forward above head instead of under mid-chest."
    ],
    proTip: "If diamond is too intense initially, place hands 6 inches apart in a close-grip push-up and progress gradually.",
    svgType: "diamond_pushups"
  },

  ex4: {
    id: "ex4",
    name: "Overhead Dumbbell Triceps Extension",
    category: "Triceps Mass (Long Head)",
    primaryMuscles: ["Triceps Long Head (Back of Upper Arm)"],
    secondaryMuscles: ["Forearms", "Core"],
    tempo: "3-1-1 (3s deep stretch behind head, 1s pause, 1s extension)",
    breathing: "Inhale as dumbbell lowers behind neck, exhale as you extend arms straight up.",
    setup: "Stand or sit upright, hold single dumbbell with both hands in diamond grip under top weight plate.",
    bestViewAngle: "Side Profile (Best for ensuring upper arms stay vertical while elbows flex)",
    youtubeVideoId: "_gsUokN_Mgg", // Overhead DB Tricep Extension Guide
    humanImage: shoulderEnd,
    motionFrames: {
      start: shoulderEnd,
      end: shoulderStart,
      startLabel: "Arms Extended Overhead",
      endLabel: "Deep Stretch Behind Neck",
    },
    checkpoints: [
      { label: "Upper Arm Angle", value: "90° Vertical to Ground", status: "optimal" },
      { label: "Elbow Flare", value: "Pointing Forward", status: "optimal" },
      { label: "Deep Stretch", value: "Dumbbell Deep Behind Neck", status: "optimal" },
    ],
    steps: [
      "1. Grip & Position: Cup hands under top dumbbell plate with arms extended straight overhead.",
      "2. Elbow Fixation: Keep upper arms perpendicular to floor and elbows pointing forward (not flaring wide).",
      "3. Deep Stretch Descent: Lower dumbbell behind head by flexing elbows until triceps feel a full stretch.",
      "4. Full Lockout: Extend arms back to overhead position, squeezing triceps at the top."
    ],
    commonMistakes: [
      "Allowing elbows to flare outward away from ears.",
      "Moving upper arms back and forth instead of isolating the elbow joint."
    ],
    proTip: "The overhead position puts the long head of the triceps on full stretch, which creates maximum muscle growth stimulus.",
    svgType: "tricep_overhead"
  },

  ex5: {
    id: "ex5",
    name: "Dumbbell Lateral Raises",
    category: "Shoulder Width & V-Taper",
    primaryMuscles: ["Lateral Deltoids (Side Shoulders)"],
    secondaryMuscles: ["Supraspinatus", "Upper Traps"],
    tempo: "2-1-2 (2s up, 1s peak hold, 2s slow descent)",
    breathing: "Exhale as you raise arms sideways, inhale as you lower weights.",
    setup: "Stand with slight forward torso lean (10°), dumbbells at sides with slight elbow bend.",
    bestViewAngle: "Front Isometric View (Best for watching hands stay level with elbows at shoulder height)",
    youtubeVideoId: "3VcKaXpzqRo", // Lateral Raises Form Tutorial
    humanImage: shoulderStart,
    motionFrames: {
      start: curlStart,
      end: shoulderStart,
      startLabel: "Dumbbells at Thighs",
      endLabel: "Arms Raised to Shoulder Level",
    },
    checkpoints: [
      { label: "Elbow Lead", value: "Elbows Above Wrists", status: "optimal" },
      { label: "Peak Height", value: "Shoulder Level Arc", status: "optimal" },
      { label: "Torso Lean", value: "10° Forward Hinge", status: "optimal" },
    ],
    steps: [
      "1. Stance: Feet hip-width, chest proud, slight 10° forward hip hinge.",
      "2. Slight Elbow Bend: Maintain a fixed 15-20° bend in elbows throughout the entire movement.",
      "3. Lead with Elbows: Raise dumbbells out sideways until elbows reach shoulder height (palms facing ground).",
      "4. Controlled Fall: Resist gravity and lower dumbbells slowly over 2 full seconds."
    ],
    commonMistakes: [
      "Using heavy weights and swinging hips/torso for momentum.",
      "Raising hands higher than elbows (which shifts load to traps rather than side delts)."
    ],
    proTip: "Use the light 2.5kg plates with strict form. Pretend you are pouring water out of a pitcher at the peak.",
    svgType: "lateral_raise"
  },

  ex6: {
    id: "ex6",
    name: "Two-Arm Bent-Over Dumbbell Rows",
    category: "Back Mass & Lat Width (Pull-Up Substitute)",
    primaryMuscles: ["Latissimus Dorsi (Lats)", "Rhomboids", "Middle Trapezius"],
    secondaryMuscles: ["Biceps Brachii", "Rear Delts", "Erector Spinae"],
    tempo: "2-1-1 (2s row to waist, 1s squeeze shoulder blades, 1s lowering)",
    breathing: "Exhale as you pull weights to hips, inhale as you lower.",
    setup: "Hinge at hips to a 45-degree angle, flat back, dumbbells hanging at arm's length.",
    bestViewAngle: "Pure Side Profile View (Best for checking 45° flat tabletop back & hip row path)",
    youtubeVideoId: "pYcpY20QaE8", // Bent Over Dumbbell Rows Form
    humanImage: bentRowImg,
    motionFrames: {
      start: bentRowImg,
      end: bentRowImg,
      startLabel: "Hanging Arm Lat Stretch",
      endLabel: "Elbows Rowed into Hip Pockets",
    },
    checkpoints: [
      { label: "Torso Hinge", value: "45° Flat Tabletop", status: "optimal" },
      { label: "Row Direction", value: "Arc to Hip Pockets", status: "optimal" },
      { label: "Scapula Squeeze", value: "Full Rhomboid Pinch", status: "optimal" },
      { label: "Knee Bend", value: "Soft 15° Athletic", status: "optimal" },
    ],
    steps: [
      "1. Hip Hinge: Push hips back with knees soft, keeping back straight and neutral like a tabletop.",
      "2. Hang & Stretch: Hold dumbbells directly below shoulders with palms facing each other or slightly turned in.",
      "3. Pull to Hip Pocket: Drive elbows backward towards your hips (not straight up), pulling shoulder blades tight together.",
      "4. Peak Contraction & Lower: Squeeze back muscles for 1 second, then lower weights with control to full arm stretch."
    ],
    commonMistakes: [
      "Rounding the lower spine or standing too upright.",
      "Pulling weights up to chest using only bicep strength instead of rowing to hips."
    ],
    proTip: "This is your primary pull-up replacement! Drive with your elbows like you are trying to elbow someone behind you.",
    svgType: "bent_row"
  },

  ex7: {
    id: "ex7",
    name: "Single-Arm Dumbbell Row (Chair Supported)",
    category: "Back Thickness & Lat Isolation",
    primaryMuscles: ["Latissimus Dorsi", "Teres Major"],
    secondaryMuscles: ["Biceps", "Brachialis", "Rear Deltoids"],
    tempo: "2-1-1 (2s pull, 1s squeeze at hip, 1s lower)",
    breathing: "Exhale as you pull dumbbell to hip, inhale as you lower.",
    setup: "One knee and same-side hand braced on chair/bed, flat back parallel to ground.",
    bestViewAngle: "Side 3/4 Elevated View (Best for verifying steady torso & full lat stretch)",
    youtubeVideoId: "dFzUjzfih7U", // Single Arm DB Row Form
    humanImage: singleRowImg,
    motionFrames: {
      start: singleRowImg,
      end: singleRowImg,
      startLabel: "Hanging Stretch with Flat Back",
      endLabel: "Elbow Driven Back to Hip",
    },
    checkpoints: [
      { label: "Tripod Base", value: "Hand + Knee Firmly Braced", status: "optimal" },
      { label: "Spine Angle", value: "Parallel to Floor", status: "optimal" },
      { label: "Row Trajectory", value: "Elbow Pulled Back to Hip", status: "optimal" },
    ],
    steps: [
      "1. Stable Tripod Base: Place left knee and left hand firmly on chair. Right foot grounded on floor.",
      "2. Flat Spine: Keep back flat and spine neutral, gazing slightly forward.",
      "3. Elbow Arc to Hip: Pull dumbbell in an arc backwards towards right hip pocket.",
      "4. Lat Squeeze: Squeeze right lat at top without twisting torso, then lower to full lat stretch."
    ],
    commonMistakes: [
      "Rotating torso to yank the weight up.",
      "Dropping head down or hunching neck."
    ],
    proTip: "Loaded with 10kg or 12.5kg, this creates enormous back thickness without needing a gym machine or pull-up bar.",
    svgType: "single_row"
  },

  ex_pullover: {
    id: "ex_pullover",
    name: "Dumbbell Floor Pullover",
    category: "Lat Width & Chest Expansion (Lat Pulldown Substitute)",
    primaryMuscles: ["Latissimus Dorsi (Outer Lats)", "Serratus Anterior"],
    secondaryMuscles: ["Pectoralis Major", "Triceps Long Head"],
    tempo: "3-1-1 (3s deep overhead stretch, 1s pause, 1s pull back)",
    breathing: "Deep inhale as dumbbell extends behind head, exhale as you pull back over chest.",
    setup: "Lie on floor with knees bent, holding single dumbbell over chest with both hands in diamond grip.",
    bestViewAngle: "Side Lateral View (Best for seeing the overhead lat stretch arc)",
    youtubeVideoId: "5YStMTC8INg", // Dumbbell Pullover Guide
    humanImage: dbPressImg,
    motionFrames: {
      start: dbPressImg,
      end: dbPressImg,
      startLabel: "Dumbbell Over Chest",
      endLabel: "Deep Overhead Lat Stretch",
    },
    checkpoints: [
      { label: "Elbow Flexion", value: "Slight Fixed 15° Bend", status: "optimal" },
      { label: "Stretch Depth", value: "Upper Arms Level with Torso", status: "optimal" },
      { label: "Lumbar Spine", value: "Flat on Floor (No Arching)", status: "optimal" },
    ],
    steps: [
      "1. Supine Position: Lie flat, hold dumbbell vertically above chest with elbows slightly unlocked.",
      "2. Overhead Arc: Keeping slight fixed elbow bend, slowly lower dumbbell in an arc backwards over and behind your head.",
      "3. Full Lat Stretch: Lower until upper arms are aligned with torso and you feel a deep lat stretch.",
      "4. Pull from Lats: Contract lats to pull dumbbell back to position above chest."
    ],
    commonMistakes: [
      "Bending elbows excessively, turning it into a tricep extension.",
      "Lifting lower back off floor during the stretch."
    ],
    proTip: "Directly mimics the lat stretch of a cable lat pulldown! Perfect for building a wide V-taper at home.",
    svgType: "pullover"
  },

  ex8: {
    id: "ex8",
    name: "Dumbbell Rear Delt Reverse Flyes",
    category: "Upper Back & Rear Shoulders",
    primaryMuscles: ["Posterior Deltoids (Rear Shoulders)"],
    secondaryMuscles: ["Rhomboids", "Mid & Lower Trapezius"],
    tempo: "2-1-2 (2s raise, 1s pinch at top, 2s lower)",
    breathing: "Exhale as you fly weights outward, inhale as you lower.",
    setup: "Hinge forward 45-60°, knees bent, dumbbells hanging beneath chest with slight elbow bend.",
    bestViewAngle: "3/4 Angled Front Profile (Best for observing wide bird-wing flight arc)",
    youtubeVideoId: "EA7uKGdd_oo", // Rear Delt Fly Guide
    humanImage: bentRowImg,
    motionFrames: {
      start: bentRowImg,
      end: bentRowImg,
      startLabel: "Hanging at Shin Level",
      endLabel: "Wings Flying at Shoulder Height",
    },
    checkpoints: [
      { label: "Wing Arc", value: "Outward to Shoulder Height", status: "optimal" },
      { label: "Scapula Retraction", value: "Pinch Rear Shoulder Caps", status: "optimal" },
    ],
    steps: [
      "1. Bent-Over Stance: Hinge at hips until torso is roughly 45° to floor with neutral spine.",
      "2. Wide Arc: Raise arms out to the sides like bird wings, keeping elbows slightly bent.",
      "3. Squeeze Scapula: Pinch rear delts and shoulder blades together at shoulder height.",
      "4. Controlled Return: Lower weights slowly without letting momentum swing."
    ],
    commonMistakes: [
      "Using heavy momentum and jerking torso upwards.",
      "Shrugging traps up to ears instead of isolating rear delts."
    ],
    proTip: "Use the 2.5kg plates for high mind-muscle connection. Essential for fixing study posture from long GATE prep hours!",
    svgType: "rear_delt_fly"
  },

  ex9: {
    id: "ex9",
    name: "Standing Supinated Bicep Curls",
    category: "Bicep Peak & Arm Hypertrophy",
    primaryMuscles: ["Biceps Brachii (Short & Long Head)"],
    secondaryMuscles: ["Brachialis", "Forearm Flexors"],
    tempo: "2-1-2 (2s curl with wrist rotation, 1s peak squeeze, 2s eccentric descent)",
    breathing: "Exhale as you curl dumbbells up, inhale as you lower.",
    setup: "Stand tall, dumbbells at sides with palms facing thighs (neutral grip).",
    bestViewAngle: "Front 3/4 Contoured View (Best for seeing wrist supination & bicep peak contraction)",
    youtubeVideoId: "in7PaeYlhrM", // Bicep Curl Masterclass
    humanImage: curlEnd,
    motionFrames: {
      start: curlStart,
      end: curlEnd,
      startLabel: "Arms Straight at Thighs (Start)",
      endLabel: "Full Bicep Peak Curl (Peak Squeeze)",
    },
    checkpoints: [
      { label: "Elbow Position", value: "Pinned to Ribcage", status: "optimal" },
      { label: "Wrist Supination", value: "Pinky Turned High at Peak", status: "optimal" },
      { label: "Body Swing", value: "0% Strict Isolation", status: "optimal" },
      { label: "Full ROM", value: "Full Hang to Shoulder Flex", status: "optimal" },
    ],
    steps: [
      "1. Starting Hang: Stand with core braced, elbows pinned close to ribcage.",
      "2. Supination on Ascent: As you curl upward, rotate wrists outward so palms face the ceiling by mid-way.",
      "3. Peak Squeeze: Squeeze biceps aggressively at shoulder height without moving elbows forward.",
      "4. Slow Lowering: Resist the weight all the way down until arms are fully straight."
    ],
    commonMistakes: [
      "Swinging hips or leaning back to throw weights up.",
      "Allowing elbows to drift forward, which transfers load to front deltoids."
    ],
    proTip: "Supinating (turning pinkies upward at top) recruits 100% of bicep muscle fibers for maximum peak growth.",
    svgType: "bicep_curl"
  },

  ex10: {
    id: "ex10",
    name: "Dumbbell Hammer Curls",
    category: "Arm Thickness & Forearms",
    primaryMuscles: ["Brachialis (Underneath Bicep)", "Brachioradialis (Upper Forearm)"],
    secondaryMuscles: ["Biceps Brachii"],
    tempo: "2-0-2 (2s up, 0s pause, 2s down)",
    breathing: "Exhale on curl, inhale on lower.",
    setup: "Stand tall, palms facing inward towards each other (neutral grip).",
    bestViewAngle: "Front 3/4 Isometric View (Best for seeing neutral grip arm thickness)",
    youtubeVideoId: "TwD-YGVP4Bk", // Hammer Curls Form
    humanImage: curlEnd,
    motionFrames: {
      start: curlStart,
      end: curlEnd,
      startLabel: "Neutral Hang at Sides",
      endLabel: "Hammer Curl Peak",
    },
    checkpoints: [
      { label: "Grip Orientation", value: "Neutral Hammer Grip", status: "optimal" },
      { label: "Target Muscle", value: "Brachialis & Forearms", status: "optimal" },
    ],
    steps: [
      "1. Neutral Grip: Hold dumbbells with palms facing each other like holding hammers.",
      "2. Pin Elbows: Keep elbows tight against your sides.",
      "3. Direct Upward Curl: Curl dumbbells upward while keeping palms facing each other throughout.",
      "4. Strict Lowering: Lower slowly to complete arm extension."
    ],
    commonMistakes: [
      "Flaring elbows outward.",
      "Using swinging momentum."
    ],
    proTip: "Building the brachialis pushes your biceps outward, creating much thicker arm circumference.",
    svgType: "hammer_curl"
  },

  ex11: {
    id: "ex11",
    name: "Goblet Squats",
    category: "Quad Mass & Leg Hypertrophy",
    primaryMuscles: ["Quadriceps (Front Thighs)", "Gluteus Maximus"],
    secondaryMuscles: ["Hamstrings", "Core & Calves"],
    tempo: "3-1-1 (3s deep squat descent, 1s bottom pause, 1s power drive)",
    breathing: "Inhale deeply into abdomen before squatting, hold intra-abdominal pressure, exhale on way up.",
    setup: "Stand with feet slightly wider than shoulder-width, toes turned 15-30° out. Hold dumbbell vertically cupped at chest.",
    bestViewAngle: "Front 3/4 Angled View (Best for checking chest-high goblet hold & parallel thigh depth)",
    youtubeVideoId: "MeIiIdhvXT4", // Goblet Squat Form Tutorial
    humanImage: squatEnd,
    motionFrames: {
      start: squatStart,
      end: squatEnd,
      startLabel: "Standing Tall at Chest (Start)",
      endLabel: "Deep Parallel Squat (Bottom)",
    },
    checkpoints: [
      { label: "Squat Depth", value: "Thighs Parallel to Floor", status: "optimal" },
      { label: "Knee Tracking", value: "Pushed Out Over Toes", status: "optimal" },
      { label: "Torso Angle", value: "Upright & Tall", status: "optimal" },
      { label: "Weight Cup", value: "Held at Upper Sternum", status: "optimal" },
    ],
    steps: [
      "1. Goblet Hold: Cup top of 10kg/12.5kg dumbbell with both hands close to upper chest.",
      "2. Sit Between Hips: Push hips back and knees out in line with toes as you descend.",
      "3. Depth: Squat down until thighs are parallel to floor (or elbows touch inside of knees).",
      "4. Drive Through Heels: Press through whole foot, extending knees and hips to standing, squeezing glutes."
    ],
    commonMistakes: [
      "Knees caving inward (keep them pushed outward over toes).",
      "Heels lifting off the floor or rounding upper back."
    ],
    proTip: "Holding the weight in front keeps your torso upright naturally, protecting your spine and targeting quads directly.",
    svgType: "goblet_squat"
  },

  ex12: {
    id: "ex12",
    name: "Dumbbell Bulgarian Split Squats",
    category: "Single-Leg Hypertrophy & Glutes",
    primaryMuscles: ["Quadriceps", "Gluteus Maximus & Medius"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core Balance"],
    tempo: "2-1-1 (2s lower, 1s bottom hold, 1s drive)",
    breathing: "Inhale on descent, exhale on drive up.",
    setup: "Place top of back foot on a chair/bed behind you. Front foot stepped forward 2-3 feet.",
    bestViewAngle: "Pure Lateral Profile View (Best for checking 90° front knee & vertical hip descent)",
    youtubeVideoId: "2C-uNgKwPLE", // Bulgarian Split Squat Form
    humanImage: bulgarianSplitImg,
    motionFrames: {
      start: bulgarianSplitImg,
      end: bulgarianSplitImg,
      startLabel: "Rear Foot on Chair (Top)",
      endLabel: "90° Front Knee Descent (Bottom)",
    },
    checkpoints: [
      { label: "Front Knee Angle", value: "90° Clean Angle", status: "optimal" },
      { label: "Back Foot", value: "Elevated on Bench/Chair", status: "optimal" },
      { label: "Hip Path", value: "Vertical Descent", status: "optimal" },
      { label: "Torso Posture", value: "Tall & Symmetrical", status: "optimal" },
    ],
    steps: [
      "1. Foot Placement: Top of rear foot flat on chair/bed. Front foot positioned so front knee stays over ankle when lowered.",
      "2. Vertical Descent: Lower your hips straight down towards floor until back knee hovers 2 inches above ground.",
      "3. 90-Degree Front Knee: Front thigh should reach parallel to floor with chest upright.",
      "4. Front Leg Drive: Push through front heel to return to top without locking knee abruptly."
    ],
    commonMistakes: [
      "Front foot too close to chair, causing excessive knee shear.",
      "Leaning heavily backward onto the rear leg."
    ],
    proTip: "One of the absolute highest muscle activation exercises for building leg mass with light dumbbells at home!",
    svgType: "bulgarian_split"
  },

  ex13: {
    id: "ex13",
    name: "Dumbbell Romanian Deadlifts (RDL)",
    category: "Hamstring Mass & Posterior Chain",
    primaryMuscles: ["Hamstrings (Back of Thighs)", "Glutes"],
    secondaryMuscles: ["Erector Spinae (Lower Back)", "Trapezius", "Forearms"],
    tempo: "3-1-1 (3s slow hamstring stretch descent, 1s pause, 1s hip drive)",
    breathing: "Inhale at top and brace, exhale as you drive hips forward to lockout.",
    setup: "Feet hip-width apart, dumbbells in front of thighs, knees soft (slightly unlocked).",
    bestViewAngle: "Side Profile View (Best for verifying tabletop flat spine & butt-to-wall hip hinge)",
    youtubeVideoId: "_oyxCn2iSjU", // RDL Form Tutorial
    humanImage: rdlImg,
    motionFrames: {
      start: rdlImg,
      end: rdlImg,
      startLabel: "Standing Tall at Thighs",
      endLabel: "Hips Hinging Back / Dumbbells at Mid-Shin",
    },
    checkpoints: [
      { label: "Hip Hinge", value: "Butt Pushed Back to Wall", status: "optimal" },
      { label: "Spine Angle", value: "100% Flat Tabletop", status: "optimal" },
      { label: "Knee Angle", value: "Soft Fixed 15° Bend", status: "optimal" },
      { label: "Dumbbell Bar Path", value: "Shaving the Shins", status: "optimal" },
    ],
    steps: [
      "1. Soft Knees: Unlock knees with a 15° bend and keep them locked at this angle throughout.",
      "2. Butt to Wall Hinge: Push your hips backward as if trying to touch the wall behind you with your glutes.",
      "3. Shave the Shins: Guide dumbbells down along your thighs and shins, keeping them close to your legs.",
      "4. Deep Hamstring Stretch: Lower until you feel full hamstring stretch (around mid-shin level), then drive hips forward to stand."
    ],
    commonMistakes: [
      "Rounding lower back (keep chest proud and spine neutral).",
      "Squatting down with knees instead of hinging back at hips."
    ],
    proTip: "Keep dumbbells scraping close against your thighs. The movement is purely hip hinge forward and backward.",
    svgType: "rdl"
  },

  ex14: {
    id: "ex14",
    name: "Standing Dumbbell Calf Raises",
    category: "Calves & Lower Leg Mass",
    primaryMuscles: ["Gastrocnemius & Soleus (Calves)"],
    secondaryMuscles: ["Ankle Stabilizers", "Feet Arches"],
    tempo: "2-2-2 (2s up onto toes, 2s peak contraction hold, 2s slow lower)",
    breathing: "Exhale as you rise onto toes, inhale as you lower.",
    setup: "Stand tall holding dumbbells at sides, balls of feet grounded.",
    bestViewAngle: "Rear-Angled 3/4 View (Best for watching high peak toe extension & calf flex)",
    youtubeVideoId: "gwLzBJYoWlI", // Calf Raise Form
    humanImage: squatStart,
    motionFrames: {
      start: squatStart,
      end: squatStart,
      startLabel: "Flat on Feet",
      endLabel: "Elevated on Big Toes (2s Pause)",
    },
    checkpoints: [
      { label: "Peak Elevation", value: "High on Big Toes", status: "optimal" },
      { label: "Peak Pause", value: "2 Full Seconds", status: "optimal" },
    ],
    steps: [
      "1. Stance: Feet hip-width apart with toes pointing straight forward.",
      "2. Rise onto Balls of Feet: Press powerfully through big toes to elevate heels as high as possible.",
      "3. 2-Second Squeeze: Hold peak contraction at the very top for 2 full seconds.",
      "4. Deep Stretch Descent: Lower heels slowly all the way down until flat."
    ],
    commonMistakes: [
      "Bouncing fast without holding peak contraction.",
      "Rolling ankles outward onto outer toes."
    ],
    proTip: "The 2-second pause at the peak removes Achilles tendon elastic bounce and forces calf muscle fibers to do 100% of the work.",
    svgType: "calf_raise"
  },

  ex_pushups_incline: {
    id: "ex_pushups_incline",
    name: "Feet-Elevated / Declinable Push-Ups",
    category: "Upper Chest & Front Delts (Incline Bench Replacement)",
    primaryMuscles: ["Clavicular Pectoralis (Upper Chest)", "Anterior Deltoid"],
    secondaryMuscles: ["Triceps", "Core & Serratus Anterior"],
    tempo: "2-0-1 (2s descent, 0s pause, 1s explosive push)",
    breathing: "Inhale descending to floor, exhale pushing away.",
    setup: "Toes placed on chair or bed, hands on floor slightly wider than shoulders.",
    bestViewAngle: "Side 3/4 Angle (Best for observing elevated feet & upper clavicular chest tension)",
    youtubeVideoId: "tCcySZk9Gg4", // Feet Elevated Pushups
    humanImage: pushupEnd,
    motionFrames: {
      start: pushupStart,
      end: pushupEnd,
      startLabel: "Elevated Feet High Plank",
      endLabel: "Upper Chest Floor Touch",
    },
    checkpoints: [
      { label: "Foot Elevation", value: "Toes on Chair / Bed", status: "optimal" },
      { label: "Upper Chest Focus", value: "Clavicular Pec Load", status: "optimal" },
    ],
    steps: [
      "1. Elevated Setup: Place toes on bed/chair and walk hands onto floor in high plank position.",
      "2. Rigid Bodyline: Keep core and glutes squeezed so back does not sag.",
      "3. Upper Chest Descent: Lower chest until nose/chest touches 1 inch off floor.",
      "4. Powerful Push: Press floor away, feeling maximum upper chest tension."
    ],
    commonMistakes: [
      "Sagging belly towards floor.",
      "Looking straight up instead of keeping neck neutral."
    ],
    proTip: "Directly mimics an incline bench press to build high upper chest shelf for full muscle appearance!",
    svgType: "incline_pushup"
  },

  ex15: {
    id: "ex15",
    name: "Dumbbell Arnold Press",
    category: "3D Shoulder Growth (All 3 Deltoid Heads)",
    primaryMuscles: ["Anterior, Lateral & Posterior Deltoids"],
    secondaryMuscles: ["Triceps", "Trapezius", "Upper Chest"],
    tempo: "2-1-2 (2s press & rotate, 1s peak hold, 2s reverse rotation)",
    breathing: "Inhale at chest level, exhale as you rotate and press overhead.",
    setup: "Stand or sit, dumbbells held at chest level with palms facing you (bicep curl finish position).",
    bestViewAngle: "Frontal View (Best for seeing palm rotation from chest to overhead lockout)",
    youtubeVideoId: "vj2w851ZHR8", // Arnold Press Form
    humanImage: shoulderEnd,
    motionFrames: {
      start: shoulderStart,
      end: shoulderEnd,
      startLabel: "Palms Facing Chest (Start)",
      endLabel: "Rotated Overhead Lockout (Finish)",
    },
    checkpoints: [
      { label: "Rotation Plane", value: "180° Fluid Wrist Turn", status: "optimal" },
      { label: "Starting Position", value: "Palms Facing Chest", status: "optimal" },
      { label: "Finish Position", value: "Palms Facing Forward", status: "optimal" },
    ],
    steps: [
      "1. Starting Setup: Hold dumbbells in front of upper chest with palms facing your chest and elbows tucked.",
      "2. Rotation on Ascent: As you press up, rotate wrists outward so palms face forward at the top.",
      "3. Full Overhead Lockout: Complete press with dumbbells overhead directly above shoulders.",
      "4. Reverse Rotation: Lower dumbbells while rotating palms back inwards to starting chest position."
    ],
    commonMistakes: [
      "Rushing the rotation or banging dumbbells together overhead.",
      "Arching lower spine."
    ],
    proTip: "Invented by Arnold Schwarzenegger, the rotation keeps constant tension across all 3 heads of the shoulder!",
    svgType: "arnold_press"
  },

  ex_row_twist: {
    id: "ex_row_twist",
    name: "Rotational Dumbbell Rows",
    category: "Back Width & Bicep Peak (No Pull-Up Bar)",
    primaryMuscles: ["Latissimus Dorsi", "Teres Major", "Rhomboids"],
    secondaryMuscles: ["Biceps", "Forearms", "Core"],
    tempo: "2-1-1 (2s row & twist, 1s squeeze, 1s return)",
    breathing: "Exhale pulling up, inhale lowering down.",
    setup: "Bent-over 45° stance, palms facing backward/inward at the bottom stretch.",
    bestViewAngle: "Side 3/4 View (Best for checking the rotational row to hip pocket)",
    youtubeVideoId: "dFzUjzfih7U", // Rotational Row Form
    humanImage: bentRowImg,
    motionFrames: {
      start: bentRowImg,
      end: bentRowImg,
      startLabel: "Pronated Hang",
      endLabel: "Supinated Hip Row",
    },
    checkpoints: [
      { label: "Twist Mechanics", value: "Pronated to Supinated", status: "optimal" },
      { label: "Lat Squeeze", value: "Peak Lower Lat Pinch", status: "optimal" },
    ],
    steps: [
      "1. Hinge Position: 45-degree flat-back hinge holding dumbbells with palms facing backward.",
      "2. Row with Twist: As you pull elbows back to hips, rotate palms inward/outward to maximize lat contraction.",
      "3. Full Back Pinch: Pinch scapula tightly for 1 second at top.",
      "4. Lower with Counter-Twist: Lower weights back down to full arm stretch."
    ],
    commonMistakes: [
      "Pulling too high towards neck rather than to hips.",
      "Rounding spine."
    ],
    proTip: "The rotation engages both the stretch reflex of the lower lats and full bicep engagement.",
    svgType: "row_twist"
  },

  ex17: {
    id: "ex17",
    name: "Concentration Bicep Curls",
    category: "Bicep Peak Isolation",
    primaryMuscles: ["Biceps Brachii (Short Head & Peak)"],
    secondaryMuscles: ["Brachialis", "Forearms"],
    tempo: "2-1-2 (2s curl up, 1s peak squeeze, 2s slow descent)",
    breathing: "Exhale curling up, inhale lowering down.",
    setup: "Sit on chair, spread legs, brace working elbow against the inner part of same-side thigh.",
    bestViewAngle: "Seated 3/4 Front View (Best for observing braced elbow on inner thigh)",
    youtubeVideoId: "Jvj2wV0vOYU", // Concentration Curls Form
    humanImage: curlEnd,
    motionFrames: {
      start: curlStart,
      end: curlEnd,
      startLabel: "Elbow Braced on Inner Thigh (Hang)",
      endLabel: "Peak Bicep Contraction (Curl)",
    },
    checkpoints: [
      { label: "Elbow Anchor", value: "Braced on Inner Thigh", status: "optimal" },
      { label: "Body Swing", value: "0% Pure Isolation", status: "optimal" },
    ],
    steps: [
      "1. Braced Elbow: Sit on edge of chair, brace back of right tricep/elbow firmly against inner right thigh.",
      "2. Full Hang: Let dumbbell hang down towards floor with palm facing upward.",
      "3. Pure Bicep Curl: Curl dumbbell up towards your face without moving the braced elbow.",
      "4. Peak Peak: Squeeze bicep as hard as possible at the top, then lower with extreme control."
    ],
    commonMistakes: [
      "Lifting elbow off inner thigh to cheat with shoulder momentum.",
      "Swinging torso."
    ],
    proTip: "Because body swing is 100% eliminated, this produces the highest bicep muscle activation of any exercise in existence.",
    svgType: "concentration_curl"
  },

  ex18: {
    id: "ex18",
    name: "Dumbbell Kickbacks",
    category: "Triceps Lateral Head & Definition",
    primaryMuscles: ["Triceps Brachii (Lateral & Medial Head)"],
    secondaryMuscles: ["Rear Delts", "Forearms"],
    tempo: "2-1-2 (2s extend back, 1s peak lockout squeeze, 2s return)",
    breathing: "Exhale extending back, inhale returning to 90°.",
    setup: "Hinge forward 45°, upper arm pinned parallel to torso, elbow bent at 90°.",
    bestViewAngle: "Side Profile (Best for ensuring upper arm stays locked parallel to ceiling)",
    youtubeVideoId: "ZO81bExngMI", // Tricep Kickbacks Form
    humanImage: bentRowImg,
    motionFrames: {
      start: bentRowImg,
      end: bentRowImg,
      startLabel: "Elbow Bent at 90°",
      endLabel: "Full Arm Lockout Behind Torso",
    },
    checkpoints: [
      { label: "Upper Arm", value: "Pinned Parallel to Floor", status: "optimal" },
      { label: "Lockout Squeeze", value: "100% Straight Arm Extension", status: "optimal" },
    ],
    steps: [
      "1. Lock Upper Arm: Hinge forward, pull upper arm up until it is completely parallel with your torso and lock it there.",
      "2. Elbow Pivot: Keeping upper arm frozen in place, extend forearm straight backward.",
      "3. Full Arm Lockout: Squeeze triceps at complete straight arm extension for 1 full second.",
      "4. Controlled 90° Return: Lower forearm back to 90° without letting upper arm drop."
    ],
    commonMistakes: [
      "Swinging upper arm back and forth like a pendulum.",
      "Dropping elbow lower than torso."
    ],
    proTip: "Use the 2.5kg or 5kg plate. The secret is keeping the upper arm pinned parallel to the ceiling and locking out fully.",
    svgType: "kickback"
  }
};
