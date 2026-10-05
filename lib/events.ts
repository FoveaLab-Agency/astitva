import {
  Atom,
  Bot,
  Brush,
  Camera,
  Code2,
  Cpu,
  Drama,
  Gamepad2,
  Guitar,
  Lightbulb,
  Mic2,
  Music,
  Palette,
  PenTool,
  Puzzle,
  Rocket,
  Shirt,
  Swords,
  Trophy,
  Video,
  type LucideIcon,
} from 'lucide-react'

export type AstitvaEvent = {
  id: string
  number: string
  name: string
  category: string
  description: string
  icon: LucideIcon
}

// Replace names, categories and descriptions here — the whole site updates from this list.
const eventSeeds: Array<Omit<AstitvaEvent, 'id' | 'number'>> = [
  { name: 'Event 01', category: 'Technology', icon: Code2, description: 'A non-stop build sprint where code meets the clock.' },
  { name: 'Event 02', category: 'Robotics', icon: Bot, description: 'Machines you build battle across a gravity-defying arena.' },
  { name: 'Dance', category: 'Event 03', icon: Music, description: 'Bands collide in a sonic showdown under the stars.' },
  { name: 'Design', category: 'Event 04', icon: Palette, description: 'Craft visual worlds that bend perception and form.' },
  { name: 'Quiz', category: 'Event 05', icon: Lightbulb, description: 'Pitch the idea that could reshape a universe.' },
  { name: 'EFootball', category: 'Event 06', icon: Gamepad2, description: 'Squads clash for galactic glory in esports arenas.' },
  { name: 'Reel Making', category: 'Event 07', icon: Drama, description: 'Stories staged across stages and stranger dimensions.' },
  { name: 'Photography', category: 'Event 08', icon: Camera, description: 'Capture the moment where light becomes legend.' },
  { name: 'Event 09', category: 'Science', icon: Atom, description: 'Experiments and models that decode the cosmos.' },
  { name: 'Marketing', category: 'Event 10', icon: Mic2, description: 'Debate, persuade, and command the room.' },
  { name: 'Event 11', category: 'Hardware', icon: Cpu, description: 'Circuits, sensors and signals wired to win.' },
  { name: 'Fine Arts', category: 'Event 12', icon: Brush, description: 'Canvas, colour and chaos turned into art.' },
  { name: 'Documentary', category: 'Event 13', icon: Video, description: 'Short films shot, cut and screened in record time.' },
  { name: 'Fashion', category: 'Event 14', icon: Shirt, description: 'A runway where style travels at light speed.' },
  { name: 'Treasure Hunt', category: 'Event 15', icon: Puzzle, description: 'Riddles, ciphers and mind-bending quests.' },
  { name: 'Literary', category: 'Event 16', icon: PenTool, description: 'Words that orbit, collide and ignite.' },
  { name: 'Mr. & Ms. Fitness', category: 'Event 17', icon: Trophy, description: 'Raw speed, skill and stamina on the field.' },
  { name: 'Singing', category: 'Event 18', icon: Guitar, description: 'Rhythm and movement in perfect orbital sync.' },
  { name: 'Combat', category: 'Event 19', icon: Swords, description: 'Head-to-head duels where only one prevails.' },
  { name: 'Mr. & Ms. Astitva', category: 'Event 20', icon: Rocket, description: 'Startups take flight before a panel of mentors.' },
]

export const events: AstitvaEvent[] = eventSeeds.map((event, index) => ({
  ...event,
  id: `event-${index + 1}`,
  number: String(index + 1).padStart(2, '0'),
}))
